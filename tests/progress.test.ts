import { describe, expect, it } from "vitest";
import {
  calculateProgress,
  calculateTickCount,
  progressFromPointer,
} from "../src/progress";

describe("reading progress", () => {
  it("clamps progress to the scrollable range", () => {
    expect(calculateProgress(-50, 2000, 1000)).toBe(0);
    expect(calculateProgress(500, 2000, 1000)).toBe(0.5);
    expect(calculateProgress(1500, 2000, 1000)).toBe(1);
  });

  it("returns zero for a non-scrollable document", () => {
    expect(calculateProgress(200, 800, 800)).toBe(0);
  });

  it("keeps tick density near ten pixels with stable bounds", () => {
    expect(calculateTickCount(780)).toBe(78);
    expect(calculateTickCount(80)).toBe(12);
    expect(calculateTickCount(2000)).toBe(120);
  });

  it("maps pointer position to normalized track progress", () => {
    expect(progressFromPointer(100, 100, 400)).toBe(0);
    expect(progressFromPointer(300, 100, 400)).toBe(0.5);
    expect(progressFromPointer(700, 100, 400)).toBe(1);
  });
});
