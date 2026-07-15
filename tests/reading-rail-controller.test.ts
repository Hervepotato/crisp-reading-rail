// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { collectRenderedHeadings } from "../src/heading-source";
import {
  ReadingRailController,
  type RailControllerEnvironment,
  type RailView,
} from "../src/reading-rail-controller";

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
    flushFrame() {
      const first = frames.entries().next().value as [number, FrameRequestCallback] | undefined;
      if (first) {
        frames.delete(first[0]);
        first[1](0);
      }
    },
    pendingFrameId() {
      return frames.keys().next().value as number | undefined;
    },
  };
}

function makeView(): RailView & {
  visible: boolean;
  callbacks?: { onProgressSelect(progress: number): void };
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
});
