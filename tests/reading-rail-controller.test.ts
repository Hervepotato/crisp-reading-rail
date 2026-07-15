// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { collectRenderedHeadings } from "../src/heading-source";
import {
  ReadingRailController,
  type RailControllerEnvironment,
  type RailView,
} from "../src/reading-rail-controller";
import type { RailViewCallbacks } from "../src/reading-rail-view";

function setMetric(element: HTMLElement, key: string, value: number): void {
  Object.defineProperty(element, key, { configurable: true, value });
}

function makeFixture(width = 900) {
  const host = document.createElement("div");
  const scroller = document.createElement("div");
  scroller.className = "markdown-preview-view";
  host.append(scroller);
  document.body.append(host);
  setMetric(host, "clientWidth", width);
  setMetric(host, "clientHeight", 800);
  setMetric(scroller, "clientHeight", 800);
  setMetric(scroller, "scrollHeight", 1800);
  setMetric(scroller, "scrollTop", 0);
  const scrollTo = vi.fn((options?: ScrollToOptions | number) => {
    if (typeof options === "object" && typeof options.top === "number") {
      setMetric(scroller, "scrollTop", options.top);
    }
  });
  scroller.scrollTo = scrollTo as typeof scroller.scrollTo;
  scroller.getBoundingClientRect = () => ({
    top: 0,
    left: 0,
    right: 900,
    bottom: 800,
    width: 900,
    height: 800,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
  return { host, scroller };
}

function makeEnvironment() {
  let nextFrame = 1;
  const frames = new Map<number, FrameRequestCallback>();
  const cancelledFrames: number[] = [];
  const observers: Array<{ disconnect: ReturnType<typeof vi.fn> }> = [];
  let frameRequests = 0;
  const environment: RailControllerEnvironment = {
    requestAnimationFrame(callback) {
      frameRequests += 1;
      const id = nextFrame++;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame(id) {
      cancelledFrames.push(id);
      frames.delete(id);
    },
    setTimeout(callback) {
      callback();
      return 1;
    },
    clearTimeout: vi.fn(),
    createResizeObserver: vi.fn(() => {
      const observer = { observe: vi.fn(), disconnect: vi.fn() };
      observers.push(observer);
      return observer;
    }),
    createMutationObserver: vi.fn(() => {
      const observer = { observe: vi.fn(), disconnect: vi.fn() };
      observers.push(observer);
      return observer;
    }),
    reducedMotion: () => false,
  };
  return {
    environment,
    observers,
    cancelledFrames,
    get frameRequests() {
      return frameRequests;
    },
    flushFrame(timestamp = 0) {
      const first = frames.entries().next().value as [number, FrameRequestCallback] | undefined;
      if (first) {
        frames.delete(first[0]);
        first[1](timestamp);
      }
    },
    flushFrames(timestamps: readonly number[]) {
      for (const timestamp of timestamps) {
        this.flushFrame(timestamp);
      }
    },
    pendingFrameId() {
      return frames.keys().next().value as number | undefined;
    },
  };
}

function makeView(): RailView & {
  visible: boolean;
  callbacks?: RailViewCallbacks;
} {
  return {
    visible: false,
    setOutline: vi.fn(),
    setProgress: vi.fn(),
    setActiveHeading: vi.fn(),
    setExpanded: vi.fn(),
    setVisible(visible) {
      this.visible = visible;
    },
    refreshAppearance: vi.fn(),
    destroy: vi.fn(),
  };
}

beforeEach(() => {
  document.body.replaceChildren();
});

describe("collectRenderedHeadings", () => {
  it("excludes headings from embedded notes", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <h2>First</h2>
      <h3>Detail</h3>
      <div class="internal-embed"><h2>Embedded</h2></div>
      <h5>Too deep</h5>
    `;
    expect(collectRenderedHeadings(container).map((item) => item.text)).toEqual([
      "First",
      "Detail",
    ]);
  });
});

describe("ReadingRailController", () => {
  it("coalesces scroll work, applies visibility rules, and cleans up", () => {
    const { host, scroller } = makeFixture();
    const clock = makeEnvironment();
    const view = makeView();
    const controller = new ReadingRailController({
      host,
      scroller,
      preview: scroller,
      getHeadings: () => [],
      environment: clock.environment,
      createView: (_host, callbacks) => {
        view.callbacks = callbacks;
        return view;
      },
    });

    controller.start();
    clock.flushFrame();
    expect(view.visible).toBe(true);

    const beforeScroll = clock.frameRequests;
    for (let index = 0; index < 5; index += 1) {
      scroller.dispatchEvent(new Event("scroll"));
    }
    expect(clock.frameRequests - beforeScroll).toBe(1);
    const pendingFrameId = clock.pendingFrameId()!;

    setMetric(host, "clientWidth", 600);
    controller.refresh();
    expect(view.visible).toBe(false);

    controller.destroy();
    expect(clock.cancelledFrames).toContain(pendingFrameId);
    expect(clock.observers.every((observer) => observer.disconnect.mock.calls.length === 1)).toBe(true);
    expect(view.destroy).toHaveBeenCalledTimes(1);
  });

  it("navigates proportionally and honors reduced motion", () => {
    const { host, scroller } = makeFixture();
    const clock = makeEnvironment();
    clock.environment.reducedMotion = () => true;
    const view = makeView();
    const controller = new ReadingRailController({
      host,
      scroller,
      preview: scroller,
      getHeadings: () => [],
      environment: clock.environment,
      createView: (_host, callbacks) => {
        view.callbacks = callbacks;
        return view;
      },
    });
    controller.start();
    clock.flushFrame();
    view.callbacks?.onProgressSelect(0.5);
    expect(scroller.scrollTo).toHaveBeenCalledWith({ top: 500, behavior: "auto" });
    controller.destroy();
  });

  it("settles long-distance progress navigation against changing scroll height", () => {
    const { host, scroller } = makeFixture();
    setMetric(scroller, "scrollHeight", 10000);
    setMetric(scroller, "scrollTop", 5000);
    const clock = makeEnvironment();
    const view = makeView();
    const controller = new ReadingRailController({
      host,
      scroller,
      preview: scroller,
      getHeadings: () => [],
      environment: clock.environment,
      createView: (_host, callbacks) => {
        view.callbacks = callbacks;
        return view;
      },
    });
    controller.start();
    clock.flushFrame();
    view.callbacks?.onProgressSelect(0.2);
    setMetric(scroller, "scrollHeight", 12000);
    clock.flushFrames([0, 1000, 1016, 1032]);

    expect(scroller.scrollTop).toBe(2240);
    const progressScrollCalls = (
      vi.mocked(scroller.scrollTo).mock.calls as unknown
    ) as Array<[ScrollToOptions]>;
    expect(progressScrollCalls.every(([options]) => options.behavior === "auto")).toBe(true);
    controller.destroy();
  });

  it("tracks a rendered heading whose document position shifts during navigation", () => {
    const { host, scroller } = makeFixture();
    setMetric(scroller, "scrollHeight", 12000);
    setMetric(scroller, "scrollTop", 1000);
    let headingDocumentY = 9000;
    const heading = document.createElement("h2");
    heading.textContent = "First";
    heading.getBoundingClientRect = () => ({
      top: headingDocumentY - scroller.scrollTop,
      left: 0,
      right: 0,
      bottom: headingDocumentY - scroller.scrollTop + 20,
      width: 0,
      height: 20,
      x: 0,
      y: headingDocumentY - scroller.scrollTop,
      toJSON: () => ({}),
    });
    scroller.append(heading);
    const clock = makeEnvironment();
    const view = makeView();
    const controller = new ReadingRailController({
      host,
      scroller,
      preview: scroller,
      getHeadings: () => [{ text: "First", level: 2, sourceLine: 0 }],
      getLineCount: () => 101,
      environment: clock.environment,
      createView: (_host, callbacks) => {
        view.callbacks = callbacks;
        return view;
      },
    });
    controller.start();
    clock.flushFrame();
    const firstOutline = vi.mocked(view.setOutline).mock.calls[0][0];
    view.callbacks?.onHeadingSelect(firstOutline[0]);
    headingDocumentY = 8200;
    clock.flushFrames([0, 1000, 1016, 1032]);

    expect(scroller.scrollTop).toBe(8200);
    const headingScrollCalls = (
      vi.mocked(scroller.scrollTo).mock.calls as unknown
    ) as Array<[ScrollToOptions]>;
    expect(headingScrollCalls.every(([options]) => options.behavior === "auto")).toBe(true);
    controller.destroy();
  });

  it("corrects a virtualized heading jump after its target renders", () => {
    const { host, scroller } = makeFixture();
    const clock = makeEnvironment();
    const view = makeView();
    const controller = new ReadingRailController({
      host,
      scroller,
      preview: scroller,
      getHeadings: () => [{ text: "First", level: 2, sourceLine: 50 }],
      getLineCount: () => 101,
      environment: clock.environment,
      createView: (_host, callbacks) => {
        view.callbacks = callbacks;
        return view;
      },
    });
    controller.start();
    clock.flushFrame();

    const firstOutline = vi.mocked(view.setOutline).mock.calls[0][0];
    view.callbacks?.onHeadingSelect(firstOutline[0]);
    clock.flushFrames([0, 1000, 1016, 1032]);
    expect(scroller.scrollTop).toBe(500);

    const heading = document.createElement("h2");
    heading.textContent = "First";
    heading.getBoundingClientRect = () => ({
      top: 600 - scroller.scrollTop,
      left: 0,
      right: 0,
      bottom: 620 - scroller.scrollTop,
      width: 0,
      height: 20,
      x: 0,
      y: 600 - scroller.scrollTop,
      toJSON: () => ({}),
    });
    scroller.append(heading);
    setMetric(scroller, "scrollTop", 500);
    controller.refresh();
    clock.flushFrames([2000, 3000, 3016, 3032]);
    expect(scroller.scrollTop).toBe(600);
    controller.destroy();
  });

  it("forwards appearance changes without rebuilding or scrolling", () => {
    const { host, scroller } = makeFixture();
    const clock = makeEnvironment();
    const view = makeView();
    const controller = new ReadingRailController({
      host,
      scroller,
      preview: scroller,
      getHeadings: () => [],
      environment: clock.environment,
      createView: () => view,
    });
    controller.start();
    clock.flushFrame();
    vi.mocked(scroller.scrollTo).mockClear();

    controller.refreshAppearance();

    expect(view.refreshAppearance).toHaveBeenCalledTimes(1);
    expect(scroller.scrollTo).not.toHaveBeenCalled();
    expect(view.destroy).not.toHaveBeenCalled();
  });
});
