import { normalizeOrbStyle, type OrbStyleSetting } from "./orb-styles";
import {
  normalizeSoundStyle,
  type ReadingRailSoundStyle,
} from "./sound-styles";

const MAX_WAYPOINTS_PER_NOTE = 50;
const MAX_WAYPOINT_NOTES = 500;
const WAYPOINT_PRECISION = 4;

export type ReadingWaypointMap = Record<string, number[]>;

export interface CrispReadingRailSettings {
  orbStyle: OrbStyleSetting;
  soundEnabled: boolean;
  soundStyle: ReadingRailSoundStyle;
  releaseSoundEnabled: boolean;
  waypoints: ReadingWaypointMap;
  licenseCode: string;
}

export const DEFAULT_SETTINGS: CrispReadingRailSettings = {
  orbStyle: "default",
  soundEnabled: false,
  soundStyle: "followFileExplorer",
  releaseSoundEnabled: true,
  waypoints: {},
  licenseCode: "",
};

export function normalizeWaypoints(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const unique = new Set<number>();
  for (const candidate of value) {
    if (
      typeof candidate !== "number"
      || !Number.isFinite(candidate)
      || candidate < 0
      || candidate > 1
    ) {
      continue;
    }
    unique.add(Number(candidate.toFixed(WAYPOINT_PRECISION)));
  }
  return [...unique]
    .sort((left, right) => left - right)
    .slice(0, MAX_WAYPOINTS_PER_NOTE);
}

export function normalizeWaypointMap(value: unknown): ReadingWaypointMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const normalized: ReadingWaypointMap = {};
  const entries = Object.entries(value as Record<string, unknown>)
    .slice(0, MAX_WAYPOINT_NOTES);
  for (const [path, waypoints] of entries) {
    if (path.trim().length === 0) {
      continue;
    }
    const noteWaypoints = normalizeWaypoints(waypoints);
    if (noteWaypoints.length > 0) {
      normalized[path] = noteWaypoints;
    }
  }
  return normalized;
}

export function updateWaypointMap(
  current: ReadingWaypointMap,
  filePath: string,
  waypoints: readonly number[],
): ReadingWaypointMap {
  const next = { ...current };
  const normalized = normalizeWaypoints(waypoints);
  if (normalized.length === 0) {
    delete next[filePath];
  } else {
    next[filePath] = normalized;
  }
  return next;
}

export function rewriteWaypointMapPaths(
  current: ReadingWaypointMap,
  oldPath: string,
  newPath: string | null,
): ReadingWaypointMap {
  const sourcePath = oldPath.replace(/\/+$/, "");
  const destinationPath = newPath?.replace(/\/+$/, "") ?? null;
  if (sourcePath.length === 0 || destinationPath === sourcePath) {
    return normalizeWaypointMap(current);
  }

  const next: ReadingWaypointMap = {};
  for (const [path, waypoints] of Object.entries(current)) {
    const matches = path === sourcePath || path.startsWith(`${sourcePath}/`);
    if (matches && destinationPath === null) {
      continue;
    }
    const rewrittenPath = matches
      ? `${destinationPath}${path.slice(sourcePath.length)}`
      : path;
    next[rewrittenPath] = normalizeWaypoints([
      ...(next[rewrittenPath] ?? []),
      ...waypoints,
    ]);
  }
  return normalizeWaypointMap(next);
}

export function normalizeSettings(value: unknown): CrispReadingRailSettings {
  const candidate = value && typeof value === "object"
    ? value as Record<string, unknown>
    : {};
  return {
    orbStyle: normalizeOrbStyle(candidate.orbStyle),
    soundEnabled: candidate.soundEnabled === true,
    soundStyle: normalizeSoundStyle(candidate.soundStyle),
    releaseSoundEnabled: candidate.releaseSoundEnabled !== false,
    waypoints: normalizeWaypointMap(candidate.waypoints),
    licenseCode: typeof candidate.licenseCode === "string" ? candidate.licenseCode.trim() : "",
  };
}
