// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
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
