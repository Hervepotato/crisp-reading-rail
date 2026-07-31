import { describe, expect, it } from "vitest";
import { headingTextFromMarkdown } from "../src/heading-text";

describe("headingTextFromMarkdown", () => {
  it("uses the annotated target instead of Crisp Annotations metadata", () => {
    expect(headingTextFromMarkdown(
      '==How a GPU works=={ann note="GPU是如何工作的" place=right color=purple}',
    )).toBe("How a GPU works");
  });

  it("uses the visible label of Obsidian wiki links", () => {
    expect(headingTextFromMarkdown(
      "Read [[Documentation|the reference guide]] first",
    )).toBe("Read the reference guide first");
  });
});
