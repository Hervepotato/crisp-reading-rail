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

  it("strips bold and italic markers", () => {
    expect(headingTextFromMarkdown("**Bold** and *italic*")).toBe(
      "Bold and italic",
    );
  });

  it("strips bold with underscores", () => {
    expect(headingTextFromMarkdown("__Bold__ text")).toBe("Bold text");
  });

  it("does not strip underscores inside words", () => {
    expect(headingTextFromMarkdown("my_file_name")).toBe("my_file_name");
  });

  it("strips strikethrough markers", () => {
    expect(headingTextFromMarkdown("~~deleted~~ kept")).toBe(
      "deleted kept",
    );
  });

  it("strips inline code backticks", () => {
    expect(headingTextFromMarkdown("Use `npm run check`")).toBe(
      "Use npm run check",
    );
  });

  it("strips plain highlight markers", () => {
    expect(headingTextFromMarkdown("==important== note")).toBe(
      "important note",
    );
  });

  it("strips markdown comments", () => {
    expect(headingTextFromMarkdown("Visible %%hidden%% text")).toBe(
      "Visible text",
    );
  });

  it("strips combined bold-italic markers", () => {
    expect(headingTextFromMarkdown("***bold italic***")).toBe(
      "bold italic",
    );
  });

  it("strips residual heading markers", () => {
    expect(headingTextFromMarkdown("## Heading text")).toBe(
      "Heading text",
    );
  });

  it("preserves crisp annotation target while stripping its inline formatting", () => {
    expect(headingTextFromMarkdown(
      '==**Bold target**=={ann note="备注"}',
    )).toBe("Bold target");
  });

  it("collapses internal whitespace", () => {
    expect(headingTextFromMarkdown("Heading  with   extra   spaces")).toBe(
      "Heading with extra spaces",
    );
  });
});
