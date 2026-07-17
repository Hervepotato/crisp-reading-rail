import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, normalizeSettings } from "../src/settings";

describe("plugin settings", () => {
  it("defaults to the theme orb", () => {
    expect(DEFAULT_SETTINGS).toEqual({
      orbStyle: "default",
      soundEnabled: false,
    });
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
  });

  it("preserves valid orb choices and repairs invalid data", () => {
    expect(normalizeSettings({ orbStyle: "followFileExplorer" })).toEqual({
      orbStyle: "followFileExplorer",
      soundEnabled: false,
    });
    expect(normalizeSettings({ orbStyle: "old-orb", unrelated: true })).toEqual({
      orbStyle: "default",
      soundEnabled: false,
    });
  });

  it("preserves only an explicit navigation-sound opt-in", () => {
    expect(normalizeSettings({ orbStyle: "gear", soundEnabled: true })).toEqual({
      orbStyle: "gear",
      soundEnabled: true,
    });
    expect(normalizeSettings({ soundEnabled: "yes" })).toEqual({
      orbStyle: "default",
      soundEnabled: false,
    });
  });
});
