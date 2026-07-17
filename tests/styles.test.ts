import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "styles.css"), "utf8");

describe("Crisp Reading Rail styles", () => {
  it("uses the companion rail's focus glow and mirrored tick proportions", () => {
    expect(css).toMatch(
      /\.crisp-reading-rail \.crisp-reading-rail__line-focus\s*{[\s\S]*?height: 192px;[\s\S]*?linear-gradient/,
    );
    expect(css).toMatch(
      /\.crisp-reading-rail \.crisp-reading-rail__tick\s*{[\s\S]*?width: 14px;/,
    );
    expect(css).toMatch(
      /\.crisp-reading-rail \.crisp-reading-rail__heading-tick\[data-level="2"\]\s*{\s*width: 24px;/,
    );
  });

  it("keeps only the orb-centered focus line instead of a full-height rule", () => {
    expect(css).toMatch(
      /\.crisp-reading-rail \.crisp-reading-rail__line::before\s*{[\s\S]*?content: none;/,
    );
    expect(css).not.toMatch(
      /focus-visible[\s\S]*?\.crisp-reading-rail__line::before/,
    );
    expect(css).toMatch(
      /focus-visible[\s\S]*?\.crisp-reading-rail__line-focus/,
    );
  });

  it("exposes a touch-safe grab affordance and restrained drag feedback", () => {
    expect(css).toMatch(
      /\.crisp-reading-rail \.crisp-reading-rail__orb\s*{[\s\S]*?cursor: grab;[\s\S]*?touch-action: none;/,
    );
    expect(css).toMatch(
      /\.crisp-reading-rail \.crisp-reading-rail__orb\.is-dragging\s*{[\s\S]*?cursor: grabbing;/,
    );
    expect(css).not.toContain("transition: all");
  });
});
