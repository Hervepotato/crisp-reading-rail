import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, normalizeSettings } from "../src/settings";

describe("plugin settings", () => {
  it("defaults to the theme orb", () => {
    expect(DEFAULT_SETTINGS).toEqual({ orbStyle: "default" });
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
  });

  it("preserves valid orb choices and repairs invalid data", () => {
    expect(normalizeSettings({ orbStyle: "followFileExplorer" })).toEqual({
      orbStyle: "followFileExplorer",
    });
    expect(normalizeSettings({ orbStyle: "old-orb", unrelated: true })).toEqual({
      orbStyle: "default",
    });
  });
});
