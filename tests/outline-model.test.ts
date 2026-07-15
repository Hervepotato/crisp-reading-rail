import { describe, expect, it } from "vitest";
import {
  activeHeadingIndex,
  buildOutlineEntries,
  resolveLabelPositions,
} from "../src/outline-model";

const headings = [
  { text: "Title", level: 1, sourceLine: 0 },
  { text: "First", level: 2, sourceLine: 3 },
  { text: "Detail", level: 3, sourceLine: 9 },
  { text: "Too deep", level: 5, sourceLine: 12 },
];

describe("outline model", () => {
  it("keeps only H2-H4 entries with unambiguous rendered targets", () => {
    const rendered = [
      { text: "First", level: 2, documentY: 200, target: {} as HTMLElement },
      { text: "Detail", level: 3, documentY: 260, target: {} as HTMLElement },
    ];
    const result = buildOutlineEntries(headings, rendered, 100, 1000);
    expect(result.map((entry) => [entry.text, entry.level, entry.progress])).toEqual([
      ["First", 2, 0.1],
      ["Detail", 3, 0.16],
    ]);
  });

  it("omits a mismatched rendered target instead of guessing", () => {
    const rendered = [
      { text: "Wrong", level: 2, documentY: 200, target: {} as HTMLElement },
      { text: "Detail", level: 3, documentY: 260, target: {} as HTMLElement },
    ];
    expect(buildOutlineEntries(headings, rendered, 100, 1000).map((entry) => entry.text)).toEqual([
      "Detail",
    ]);
  });

  it("keeps the full outline when Obsidian virtualizes off-screen headings", () => {
    const detailTarget = {} as HTMLElement;
    const rendered = [
      { text: "Detail", level: 3, documentY: 260, target: detailTarget },
    ];
    const result = buildOutlineEntries(headings, rendered, 100, 1000, 13);
    expect(result.map((entry) => ({
      text: entry.text,
      progress: entry.progress,
      hasTarget: entry.target !== null,
    }))).toEqual([
      { text: "First", progress: 0.25, hasTarget: false },
      { text: "Detail", progress: 0.75, hasTarget: true },
    ]);
  });

  it("preserves order while separating colliding labels", () => {
    const entries = [
      { text: "A", level: 2, sourceLine: 1, documentY: 10, progress: 0.1, labelY: 0, target: {} as HTMLElement },
      { text: "B", level: 2, sourceLine: 2, documentY: 11, progress: 0.11, labelY: 0, target: {} as HTMLElement },
    ];
    const result = resolveLabelPositions(entries, 100, 16, 4);
    expect(result[1].labelY - result[0].labelY).toBeGreaterThanOrEqual(20);
    expect(result[0].labelY).toBeGreaterThanOrEqual(0);
    expect(result[1].labelY).toBeLessThanOrEqual(84);
  });

  it("returns no active heading before the first threshold", () => {
    const entries = [
      { text: "A", level: 2, sourceLine: 1, documentY: 300, progress: 0.3, labelY: 30, target: {} as HTMLElement },
      { text: "B", level: 2, sourceLine: 2, documentY: 700, progress: 0.7, labelY: 70, target: {} as HTMLElement },
    ];
    expect(activeHeadingIndex(entries, 100, 80)).toBe(-1);
    expect(activeHeadingIndex(entries, 250, 80)).toBe(0);
    expect(activeHeadingIndex(entries, 650, 80)).toBe(1);
  });
});
