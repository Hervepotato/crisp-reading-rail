// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ReadingRailView,
  type RailViewEnvironment,
} from "../src/reading-rail-view";

function makeEntry() {
  return {
    text: "First",
    level: 2,
    sourceLine: 1,
    documentY: 100,
    progress: 0.25,
    labelY: 40,
    target: document.createElement("h2"),
  };
}

function setMetric(element: HTMLElement, key: string, value: number): void {
  Object.defineProperty(element, key, { configurable: true, value });
}

function translateY(element: HTMLElement | null): number {
  const match = element?.style.transform.match(/translateY\(([-\d.]+)px\)/);
  return Number(match?.[1] ?? Number.NaN);
}

function pointerEvent(
  type: string,
  pointerId: number,
  clientY: number,
  options: { button?: number; isPrimary?: boolean } = {},
): MouseEvent {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    button: options.button ?? 0,
    clientY,
  });
  Object.defineProperties(event, {
    pointerId: { value: pointerId },
    isPrimary: { value: options.isPrimary ?? true },
  });
  return event;
}

function makeViewEnvironment(reducedMotion = false) {
  let nextFrame = 1;
  let now = 0;
  const frames = new Map<number, FrameRequestCallback>();
  const cancelled: number[] = [];
  const mutationObservers: Array<{
    callback: MutationCallback;
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  }> = [];
  const environment: RailViewEnvironment = {
    requestAnimationFrame(callback) {
      const id = nextFrame++;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame(id) {
      cancelled.push(id);
      frames.delete(id);
    },
    reducedMotion: () => reducedMotion,
    createMutationObserver(callback) {
      const observer = { callback, observe: vi.fn(), disconnect: vi.fn() };
      mutationObservers.push(observer);
      return observer;
    },
  };
  return {
    environment,
    cancelled,
    mutationObservers,
    get pendingFrames() {
      return frames.size;
    },
    flushFrame() {
      const frame = frames.entries().next().value as
        | [number, FrameRequestCallback]
        | undefined;
      if (!frame) return;
      frames.delete(frame[0]);
      now += 1000 / 60;
      frame[1](now);
    },
    flushAll(limit = 240) {
      for (let index = 0; index < limit && frames.size > 0; index += 1) {
        this.flushFrame();
      }
    },
  };
}

afterEach(() => {
  vi.useRealTimers();
  document.body.replaceChildren();
});

describe("ReadingRailView", () => {
  it("renders one local slider and button labels without global handlers", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    view.setOutline([makeEntry()], 40);
    view.setProgress(0.33);

    expect(host.querySelectorAll('[role="slider"]')).toHaveLength(1);
    expect(host.querySelectorAll("button.crisp-reading-rail__label")).toHaveLength(1);
    expect(host.querySelector('[role="slider"]')?.contains(
      host.querySelector("button.crisp-reading-rail__label"),
    )).toBe(false);
    expect(host.querySelectorAll(".crisp-reading-rail__tick")).toHaveLength(40);
    expect(host.textContent).toContain("0.33");
    expect(host.querySelector('[role="slider"]')?.getAttribute("aria-valuenow")).toBe("33");
  });

  it("renders semantic heading ticks independently from fine progress ticks", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    const entries = [
      { ...makeEntry(), text: "Section", level: 2, progress: 0.1 },
      { ...makeEntry(), text: "Topic", level: 3, progress: 0.5 },
      { ...makeEntry(), text: "Detail", level: 4, progress: 0.9 },
    ];

    view.setOutline(entries, 40);
    view.setActiveHeading(1);

    expect(host.querySelectorAll(".crisp-reading-rail__tick")).toHaveLength(40);
    expect([
      ...host.querySelectorAll<HTMLElement>(".crisp-reading-rail__heading-tick"),
    ].map((tick) => [
      tick.dataset.level,
      tick.style.getPropertyValue("--crisp-reading-heading-progress"),
    ])).toEqual([
      ["2", "0.1"],
      ["3", "0.5"],
      ["4", "0.9"],
    ]);
    expect(host.querySelectorAll(
      ".crisp-reading-rail__heading-tick.is-active",
    )).toHaveLength(1);
  });

  it("reuses outline nodes while refreshing positions and click targets", () => {
    const onHeadingSelect = vi.fn();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect,
      onProgressSelect: vi.fn(),
    });
    const firstTarget = document.createElement("h2");
    const secondTarget = document.createElement("h2");
    view.setOutline([{ ...makeEntry(), target: firstTarget, progress: 0.25 }], 12);
    const firstTick = host.querySelector(".crisp-reading-rail__tick");
    const firstHeadingTick = host.querySelector<HTMLElement>(
      ".crisp-reading-rail__heading-tick",
    );
    const firstLabel = host.querySelector<HTMLButtonElement>(
      ".crisp-reading-rail__label",
    );

    view.setOutline([{ ...makeEntry(), target: secondTarget, progress: 0.6 }], 12);

    expect(host.querySelector(".crisp-reading-rail__tick")).toBe(firstTick);
    expect(host.querySelector(".crisp-reading-rail__heading-tick")).toBe(firstHeadingTick);
    expect(host.querySelector(".crisp-reading-rail__label")).toBe(firstLabel);
    expect(firstHeadingTick?.style.getPropertyValue(
      "--crisp-reading-heading-progress",
    )).toBe("0.6");
    firstLabel?.click();
    expect(onHeadingSelect).toHaveBeenCalledWith(expect.objectContaining({
      target: secondTarget,
      progress: 0.6,
    }));
  });

  it("routes label, pointer, and focused keyboard navigation locally", () => {
    const onHeadingSelect = vi.fn();
    const onProgressSelect = vi.fn();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, { onHeadingSelect, onProgressSelect });
    view.setOutline([makeEntry()], 12);
    view.setProgress(0.5);

    host.querySelector<HTMLButtonElement>(".crisp-reading-rail__label")?.click();
    expect(onHeadingSelect).toHaveBeenCalledWith(expect.objectContaining({ text: "First" }));

    const slider = host.querySelector<HTMLElement>('[role="slider"]')!;
    document.body.append(host);
    slider.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      right: 20,
      bottom: 100,
      width: 20,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    slider.dispatchEvent(new MouseEvent("pointerdown", {
      bubbles: true,
      clientY: 20,
    }));
    expect(document.activeElement).toBe(slider);
    expect(onProgressSelect).toHaveBeenLastCalledWith(0.2, true);

    slider.dispatchEvent(new KeyboardEvent("keydown", { key: "PageDown", bubbles: true }));
    expect(onProgressSelect).toHaveBeenLastCalledWith(0.6, false);

    slider.dispatchEvent(new KeyboardEvent("keydown", { key: "x", bubbles: true }));
    expect(onProgressSelect).toHaveBeenCalledTimes(2);
  });

  it("expands near the rail and keeps labels clickable for three seconds", () => {
    vi.useFakeTimers();
    const onHeadingSelect = vi.fn();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect,
      onProgressSelect: vi.fn(),
    });
    view.setOutline([makeEntry()], 12);
    const root = host.querySelector<HTMLElement>(".crisp-reading-rail")!;
    root.getBoundingClientRect = () => ({
      top: 18,
      left: 870,
      right: 900,
      bottom: 782,
      width: 30,
      height: 764,
      x: 870,
      y: 18,
      toJSON: () => ({}),
    });

    host.dispatchEvent(new MouseEvent("pointermove", {
      bubbles: true,
      clientX: 780,
      clientY: 200,
    }));
    expect(root.classList.contains("is-expanded")).toBe(true);

    host.dispatchEvent(new MouseEvent("pointermove", {
      bubbles: true,
      clientX: 700,
      clientY: 200,
    }));
    vi.advanceTimersByTime(2999);
    expect(root.classList.contains("is-expanded")).toBe(true);
    host.querySelector<HTMLButtonElement>(".crisp-reading-rail__label")?.click();
    expect(onHeadingSelect).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1);
    expect(root.classList.contains("is-expanded")).toBe(false);
  });

  it("cancels delayed collapse on re-entry and clears owned work on destroy", () => {
    vi.useFakeTimers();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    view.setOutline([makeEntry()], 12);
    const root = host.querySelector<HTMLElement>(".crisp-reading-rail")!;
    root.getBoundingClientRect = () => ({
      top: 18,
      left: 870,
      right: 900,
      bottom: 782,
      width: 30,
      height: 764,
      x: 870,
      y: 18,
      toJSON: () => ({}),
    });

    const move = (clientX: number) => host.dispatchEvent(new MouseEvent(
      "pointermove",
      { bubbles: true, clientX, clientY: 200 },
    ));
    move(780);
    move(700);
    vi.advanceTimersByTime(2000);
    move(780);
    vi.advanceTimersByTime(3000);
    expect(root.classList.contains("is-expanded")).toBe(true);

    move(700);
    view.destroy();
    vi.runAllTimers();
    expect(host.querySelector(".crisp-reading-rail")).toBeNull();
  });

  it("updates active and visible semantics", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    view.setOutline([makeEntry()], 12);
    view.setActiveHeading(0);
    view.setVisible(false);

    expect(host.querySelector(".crisp-reading-rail")?.hasAttribute("hidden")).toBe(true);
    expect(host.querySelector(".crisp-reading-rail__label")?.getAttribute("aria-current")).toBe("location");
  });

  it("does not rewrite unchanged active-heading semantics", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    view.setOutline([
      { ...makeEntry(), text: "First", progress: 0.2 },
      { ...makeEntry(), text: "Second", progress: 0.7 },
    ], 12);
    view.setActiveHeading(1);
    const labels = [...host.querySelectorAll<HTMLElement>(".crisp-reading-rail__label")];
    const ticks = [...host.querySelectorAll<HTMLElement>(".crisp-reading-rail__heading-tick")];
    const labelSpies = labels.flatMap((label) => [
      vi.spyOn(label, "setAttribute"),
      vi.spyOn(label, "removeAttribute"),
    ]);
    const tickSpies = ticks.map((tick) => vi.spyOn(tick.classList, "toggle"));

    view.setActiveHeading(1);

    for (const spy of [...labelSpies, ...tickSpies]) {
      expect(spy).not.toHaveBeenCalled();
    }
  });

  it("does not retoggle fine ticks when progress stays in the same interval", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    view.setOutline([], 100);
    view.setProgress(0.503);
    const toggleSpies = [...host.querySelectorAll<HTMLElement>(
      ".crisp-reading-rail__tick",
    )].map((tick) => vi.spyOn(tick.classList, "toggle"));

    view.setProgress(0.504);

    for (const spy of toggleSpies) {
      expect(spy).not.toHaveBeenCalled();
    }
  });

  it("moves the active marker, orb, and progress label with transforms", () => {
    const clock = makeViewEnvironment(true);
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, { environment: clock.environment });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setOutline([], 12);
    view.setProgress(0.5);

    expect(host.querySelector<HTMLElement>(".crisp-reading-rail")?.style
      .getPropertyValue("--crisp-reading-progress")).toBe("");
    expect(host.querySelector<HTMLElement>(".crisp-reading-rail__active")?.style.transform)
      .toContain("translateY(200px)");
    expect(host.querySelector<HTMLElement>(".crisp-reading-rail__orb")?.style.transform)
      .toContain("translateY(200px)");
    expect(host.querySelector<HTMLElement>(".crisp-reading-rail__progress")?.style.transform)
      .toContain("translateY(200px)");
  });

  it("centers a Crisp-style focus glow on the moving orb", () => {
    const clock = makeViewEnvironment(true);
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, { environment: clock.environment });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setOutline([], 12);
    view.setProgress(0.5);

    expect(host.querySelector(".crisp-reading-rail__line")).not.toBeNull();
    expect(host.querySelector<HTMLElement>(".crisp-reading-rail__line-focus")
      ?.style.transform).toBe("translate3d(0px, 104px, 0)");
  });

  it("drags the orb continuously with pointer capture without starting track navigation", () => {
    const onProgressSelect = vi.fn();
    const onProgressDrag = vi.fn();
    const onProgressDragEnd = vi.fn();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect,
      onProgressDrag,
      onProgressDragEnd,
    });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    const orb = host.querySelector<HTMLElement>(".crisp-reading-rail__orb")!;
    const root = host.querySelector<HTMLElement>(".crisp-reading-rail")!;
    setMetric(track, "clientHeight", 100);
    track.getBoundingClientRect = () => ({
      top: 0, left: 0, right: 30, bottom: 100, width: 30, height: 100,
      x: 0, y: 0, toJSON: () => ({}),
    });
    const setPointerCapture = vi.fn();
    const releasePointerCapture = vi.fn();
    Object.assign(orb, { setPointerCapture, releasePointerCapture });
    view.setOutline([], 12);

    orb.dispatchEvent(pointerEvent("pointerdown", 7, 20));
    expect(setPointerCapture).toHaveBeenCalledWith(7);
    expect(root.classList.contains("is-dragging")).toBe(true);
    expect(onProgressDrag).toHaveBeenLastCalledWith(0.2);
    expect(onProgressSelect).not.toHaveBeenCalled();

    window.dispatchEvent(pointerEvent("pointermove", 99, 90));
    expect(onProgressDrag).toHaveBeenCalledTimes(1);
    window.dispatchEvent(pointerEvent("pointermove", 7, 75));
    expect(onProgressDrag).toHaveBeenLastCalledWith(0.75);
    expect(translateY(orb)).toBe(75);
    view.setProgress(0.61);
    expect(translateY(orb)).toBe(75);

    window.dispatchEvent(pointerEvent("pointerup", 7, 80));
    expect(onProgressDrag).toHaveBeenLastCalledWith(0.8);
    expect(root.classList.contains("is-dragging")).toBe(false);
    expect(releasePointerCapture).toHaveBeenCalledWith(7);
    expect(onProgressDragEnd).toHaveBeenCalledWith(0.8);
  });

  it("cancels an active drag without audible completion if the rail becomes hidden", () => {
    const onProgressDragEnd = vi.fn();
    const onProgressDragCancel = vi.fn();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
      onProgressDrag: vi.fn(),
      onProgressDragEnd,
      onProgressDragCancel,
    });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    const orb = host.querySelector<HTMLElement>(".crisp-reading-rail__orb")!;
    setMetric(track, "clientHeight", 100);
    track.getBoundingClientRect = () => ({
      top: 0, left: 0, right: 30, bottom: 100, width: 30, height: 100,
      x: 0, y: 0, toJSON: () => ({}),
    });
    Object.assign(orb, {
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn(),
    });
    view.setOutline([], 12);

    orb.dispatchEvent(pointerEvent("pointerdown", 12, 36));
    view.setVisible(false);

    expect(onProgressDragEnd).not.toHaveBeenCalled();
    expect(onProgressDragCancel).toHaveBeenCalledOnce();
    expect(onProgressDragCancel).toHaveBeenCalledWith(0.36);
  });

  it("treats pointer cancellation and window blur as silent drag cancellation", () => {
    const onProgressDragEnd = vi.fn();
    const onProgressDragCancel = vi.fn();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
      onProgressDrag: vi.fn(),
      onProgressDragEnd,
      onProgressDragCancel,
    });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    const orb = host.querySelector<HTMLElement>(".crisp-reading-rail__orb")!;
    setMetric(track, "clientHeight", 100);
    track.getBoundingClientRect = () => ({
      top: 0, left: 0, right: 30, bottom: 100, width: 30, height: 100,
      x: 0, y: 0, toJSON: () => ({}),
    });
    Object.assign(orb, {
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn(),
    });
    view.setOutline([], 12);

    orb.dispatchEvent(pointerEvent("pointerdown", 13, 42));
    window.dispatchEvent(pointerEvent("pointercancel", 13, 42));
    orb.dispatchEvent(pointerEvent("pointerdown", 14, 58));
    window.dispatchEvent(new Event("blur"));

    expect(onProgressDragEnd).not.toHaveBeenCalled();
    expect(onProgressDragCancel).toHaveBeenNthCalledWith(1, 0.42);
    expect(onProgressDragCancel).toHaveBeenNthCalledWith(2, 0.58);
    view.destroy();
  });

  it("does not rewrite a far tick while the wave remains out of range", () => {
    const clock = makeViewEnvironment();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, { environment: clock.environment });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setOutline([], 5);
    view.setProgress(0.5);
    const farTick = host.querySelectorAll<HTMLElement>(".crisp-reading-rail__tick")[0];
    const setProperty = vi.spyOn(farTick.style, "setProperty");

    view.setProgress(0.75);
    clock.flushFrame();

    expect(setProperty).not.toHaveBeenCalledWith(
      "--crisp-reading-wave-x",
      expect.any(String),
    );
  });

  it("removes every owned node on destroy", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    view.destroy();
    expect(host.querySelector(".crisp-reading-rail")).toBeNull();
  });

  it("springs after the first snap and mirrors nearby ticks to negative X", () => {
    const clock = makeViewEnvironment();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, { environment: clock.environment });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setOutline([{ ...makeEntry(), progress: 0.5 }], 5);

    view.setProgress(0.25);
    expect(translateY(host.querySelector(".crisp-reading-rail__active"))).toBe(100);

    view.setProgress(0.75);
    expect(clock.pendingFrames).toBe(1);
    clock.flushFrame();
    const animatedPosition = translateY(host.querySelector(".crisp-reading-rail__active"));
    expect(animatedPosition).toBeGreaterThan(100);
    expect(animatedPosition).toBeLessThan(300);

    clock.flushAll();
    const ticks = host.querySelectorAll<HTMLElement>(".crisp-reading-rail__tick");
    expect(Number.parseFloat(ticks[3].style.getPropertyValue("--crisp-reading-wave-x")))
      .toBeLessThan(0);
    expect(ticks[0].style.getPropertyValue("--crisp-reading-wave-x")).toBe("0px");
    expect(host.querySelector<HTMLElement>(".crisp-reading-rail__heading-tick")
      ?.style.getPropertyValue("--crisp-reading-wave-x")).not.toBe("0px");
  });

  it("snaps without animation when reduced motion is enabled", () => {
    const clock = makeViewEnvironment(true);
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, { environment: clock.environment });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setOutline([], 12);
    view.setProgress(0.2);
    view.setProgress(0.8);

    expect(clock.pendingFrames).toBe(0);
    expect(translateY(host.querySelector(".crisp-reading-rail__active"))).toBe(320);
  });

  it("snaps the first progress update after becoming visible", () => {
    const clock = makeViewEnvironment();
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, { environment: clock.environment });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setVisible(false);
    view.setOutline([], 12);
    view.setVisible(true);

    view.setProgress(0.6);

    expect(clock.pendingFrames).toBe(0);
    expect(translateY(host.querySelector(".crisp-reading-rail__active"))).toBe(240);
  });

  it("renders inline and file orbs, keeps characters upright, and falls back on image error", () => {
    let style: "soccer" | "character1" = "soccer";
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, {
      appearance: {
        getOrbStyle: () => style,
        getAssetUrl: (path) => `app://reading-rail/${path}`,
      },
    });
    const orb = host.querySelector<HTMLElement>(".crisp-reading-rail__orb")!;
    expect(orb.dataset.orbStyle).toBe("soccer");
    expect(orb.querySelector("svg")).not.toBeNull();

    style = "character1";
    view.refreshAppearance();
    const image = orb.querySelector<HTMLImageElement>("img")!;
    expect(image.src).toContain("app://reading-rail/assets/character1.png");
    view.setProgress(0.5);
    expect(image.style.transform).toBe("");

    image.dispatchEvent(new Event("error"));
    expect(orb.dataset.orbStyle).toBe("default");
    expect(orb.querySelector("img")).toBeNull();
  });

  it("rotates file-backed orbs through a stable square wrapper", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, {
      appearance: {
        getOrbStyle: () => "fear",
        getAssetUrl: (path) => `app://reading-rail/${path}`,
      },
    });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setOutline([], 12);
    view.setProgress(0.5);

    const media = host.querySelector<HTMLElement>(".crisp-reading-rail__orb-media")!;
    const image = host.querySelector<HTMLImageElement>(".crisp-reading-rail__orb-image")!;
    expect(media.tagName).toBe("SPAN");
    expect(media.contains(image)).toBe(true);
    expect(media.style.transform).toMatch(/^rotate\(.+deg\)$/);
    expect(image.style.transform).toBe("");
  });

  it("follows the companion DOM style and disconnects owned observers and frames", () => {
    document.body.innerHTML =
      '<div class="crisp-fe-orb" data-orb-style="gear"></div>';
    const clock = makeViewEnvironment();
    const host = document.createElement("div");
    document.body.append(host);
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    }, {
      appearance: {
        getOrbStyle: () => "followFileExplorer",
        getAssetUrl: (path) => `app://reading-rail/${path}`,
      },
      environment: clock.environment,
    });
    const orb = host.querySelector<HTMLElement>(".crisp-reading-rail__orb")!;
    expect(orb.dataset.orbStyle).toBe("gear");
    expect(clock.mutationObservers[0].observe).toHaveBeenCalledWith(
      document.documentElement,
      expect.objectContaining({
        attributes: true,
        attributeFilter: ["data-orb-style"],
      }),
    );

    document.querySelector<HTMLElement>(".crisp-fe-orb")!.dataset.orbStyle = "tennis";
    clock.mutationObservers[0].callback([], {} as MutationObserver);
    expect(orb.dataset.orbStyle).toBe("tennis");

    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 400);
    view.setProgress(0.2);
    view.setProgress(0.8);
    view.destroy();
    expect(clock.cancelled).toHaveLength(1);
    expect(clock.mutationObservers[0].disconnect).toHaveBeenCalledTimes(1);
  });

  it("remeasures multiline labels and resolves their variable-height collisions", () => {
    const originalBounds = HTMLElement.prototype.getBoundingClientRect;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.classList.contains("crisp-reading-rail__label")) {
        const height = this.textContent === "Short" ? 18 : 54;
        return { top: 0, left: 0, right: 100, bottom: height, width: 100, height,
          x: 0, y: 0, toJSON: () => ({}) };
      }
      return originalBounds.call(this);
    });
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    const track = host.querySelector<HTMLElement>(".crisp-reading-rail__track")!;
    setMetric(track, "clientHeight", 140);
    view.setOutline([
      { ...makeEntry(), text: "Short", progress: 0.4 },
      { ...makeEntry(), text: "A very long heading that wraps across three lines", progress: 0.41 },
    ], 12);
    const labels = host.querySelectorAll<HTMLElement>(".crisp-reading-rail__label");
    const firstY = Number.parseFloat(labels[0].style.getPropertyValue("--crisp-reading-label-y"));
    const secondY = Number.parseFloat(labels[1].style.getPropertyValue("--crisp-reading-label-y"));

    expect(secondY - firstY).toBeGreaterThanOrEqual(22);
  });
});
