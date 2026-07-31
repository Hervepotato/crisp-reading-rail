import { describe, expect, it } from "vitest";
import * as settingsModule from "../src/settings";
import {
  DEFAULT_SETTINGS,
  normalizeSettings,
  updateWaypointMap,
} from "../src/settings";

describe("plugin settings", () => {
  it("defaults to the theme orb", () => {
    expect(DEFAULT_SETTINGS).toEqual({
      orbStyle: "default",
      soundEnabled: false,
      soundStyle: "followFileExplorer",
      releaseSoundEnabled: true,
      licenseCode: "",
      waypoints: {},
    });
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
  });

  it("preserves valid orb choices and repairs invalid data", () => {
    expect(normalizeSettings({ orbStyle: "followFileExplorer" })).toEqual({
      orbStyle: "followFileExplorer",
      soundEnabled: false,
      soundStyle: "followFileExplorer",
      releaseSoundEnabled: true,
      licenseCode: "",
      waypoints: {},
    });
    expect(normalizeSettings({ orbStyle: "old-orb", unrelated: true })).toEqual({
      orbStyle: "default",
      soundEnabled: false,
      soundStyle: "followFileExplorer",
      releaseSoundEnabled: true,
      licenseCode: "",
      waypoints: {},
    });
  });

  it("preserves only an explicit navigation-sound opt-in", () => {
    expect(normalizeSettings({ orbStyle: "gear", soundEnabled: true })).toEqual({
      orbStyle: "gear",
      soundEnabled: true,
      soundStyle: "followFileExplorer",
      releaseSoundEnabled: true,
      licenseCode: "",
      waypoints: {},
    });
    expect(normalizeSettings({ soundEnabled: "yes" })).toEqual({
      orbStyle: "default",
      soundEnabled: false,
      soundStyle: "followFileExplorer",
      releaseSoundEnabled: true,
      licenseCode: "",
      waypoints: {},
    });
  });

  it("normalizes sound controls from the running 0.3.8 format", () => {
    expect(normalizeSettings({
      soundStyle: "retro8bit",
      releaseSoundEnabled: false,
    })).toEqual({
      orbStyle: "default",
      soundEnabled: false,
      soundStyle: "retro8bit",
      releaseSoundEnabled: false,
      licenseCode: "",
      waypoints: {},
    });
    expect(normalizeSettings({
      soundStyle: "unknown",
      releaseSoundEnabled: "no",
    })).toEqual(DEFAULT_SETTINGS);
  });

  it("keeps sorted per-note waypoints while rejecting malformed persisted data", () => {
    expect(normalizeSettings({
      waypoints: {
        "Notes/Long.md": [0.8, 0.25, 0.25001, 1, -1, 2, "0.5", null],
        "": [0.4],
        "Notes/Empty.md": ["bad"],
      },
    }).waypoints).toEqual({
      "Notes/Long.md": [0.25, 0.8, 1],
    });
  });

  it("updates one note without mutating other persisted waypoint lists", () => {
    const original = {
      "Notes/First.md": [0.2],
      "Notes/Second.md": [0.8],
    };

    expect(updateWaypointMap(original, "Notes/First.md", [0.6, 0.4])).toEqual({
      "Notes/First.md": [0.4, 0.6],
      "Notes/Second.md": [0.8],
    });
    expect(updateWaypointMap(original, "Notes/First.md", [])).toEqual({
      "Notes/Second.md": [0.8],
    });
    expect(original).toEqual({
      "Notes/First.md": [0.2],
      "Notes/Second.md": [0.8],
    });
  });

  it("moves folder waypoints on rename and removes them on delete", () => {
    const rewriteWaypointMapPaths = (
      settingsModule as typeof settingsModule & {
        rewriteWaypointMapPaths?: (
          current: Record<string, number[]>,
          oldPath: string,
          newPath: string | null,
        ) => Record<string, number[]>;
      }
    ).rewriteWaypointMapPaths;
    expect(typeof rewriteWaypointMapPaths).toBe("function");
    if (!rewriteWaypointMapPaths) {
      return;
    }
    const original = {
      "Projects/A.md": [0.2],
      "Archive/A.md": [0.8],
      "Projects/Sub/B.md": [0.4],
      "Keep.md": [0.5],
    };

    const renamed = rewriteWaypointMapPaths(
      original,
      "Projects",
      "Archive",
    );
    expect(renamed).toEqual({
      "Archive/A.md": [0.2, 0.8],
      "Archive/Sub/B.md": [0.4],
      "Keep.md": [0.5],
    });
    expect(original).toEqual({
      "Projects/A.md": [0.2],
      "Archive/A.md": [0.8],
      "Projects/Sub/B.md": [0.4],
      "Keep.md": [0.5],
    });

    expect(rewriteWaypointMapPaths(renamed, "Archive", null)).toEqual({
      "Keep.md": [0.5],
    });
  });
});
