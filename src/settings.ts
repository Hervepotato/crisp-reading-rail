import { normalizeOrbStyle, type OrbStyleSetting } from "./orb-styles";

export interface CrispReadingRailSettings {
  orbStyle: OrbStyleSetting;
}

export const DEFAULT_SETTINGS: CrispReadingRailSettings = {
  orbStyle: "default",
};

export function normalizeSettings(value: unknown): CrispReadingRailSettings {
  const candidate = value && typeof value === "object"
    ? value as Record<string, unknown>
    : {};
  return {
    orbStyle: normalizeOrbStyle(candidate.orbStyle),
  };
}
