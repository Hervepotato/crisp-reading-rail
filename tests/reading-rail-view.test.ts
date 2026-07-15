// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReadingRailView } from "../src/reading-rail-view";

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

    slider.dispatchEvent(new KeyboardEvent("keydown", { key: "PageDown", bubbles: true }));
    expect(onProgressSelect).toHaveBeenLastCalledWith(0.6);

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

  it("removes every owned node on destroy", () => {
    const host = document.createElement("div");
    const view = ReadingRailView.mount(host, {
      onHeadingSelect: vi.fn(),
      onProgressSelect: vi.fn(),
    });
    view.destroy();
    expect(host.querySelector(".crisp-reading-rail")).toBeNull();
  });
});
