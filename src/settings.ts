import { normalizeOrbStyle, type OrbStyleSetting } from "./orb-styles";

export interface CrispReadingRailSettings {
  orbStyle: OrbStyleSetting;
  soundEnabled: boolean;
}

export const DEFAULT_SETTINGS: CrispReadingRailSettings = {
  orbStyle: "default",
  soundEnabled: false,
};

export function normalizeSettings(value: unknown): CrispReadingRailSettings {
  const candidate = value && typeof value === "object"
    ? value as Record<string, unknown>
    : {};
  return {
    orbStyle: normalizeOrbStyle(candidate.orbStyle),
    soundEnabled: candidate.soundEnabled === true,
  };
}
