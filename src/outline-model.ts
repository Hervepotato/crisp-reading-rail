import { clamp01 } from "./progress";
import type {
  OutlineEntry,
  OutlineHeading,
  RenderedHeading,
} from "./types";

const MIN_LEVEL = 2;
const MAX_LEVEL = 4;

export function buildOutlineEntries(
  headings: readonly OutlineHeading[],
  rendered: readonly RenderedHeading[],
  contentTop: number,
  maxScroll: number,
): OutlineEntry[] {
  const eligible = headings.filter(
    (heading) => heading.level >= MIN_LEVEL && heading.level <= MAX_LEVEL,
  );
  const count = Math.min(eligible.length, rendered.length);
  const entries: OutlineEntry[] = [];

  for (let index = 0; index < count; index += 1) {
    const source = eligible[index];
    const target = rendered[index];
    if (source.text !== target.text || source.level !== target.level) {
      continue;
    }

    entries.push({
      ...source,
      ...target,
      progress: maxScroll <= 0
        ? 0
        : clamp01((target.documentY - contentTop) / maxScroll),
      labelY: 0,
    });
  }

  return entries;
}

export function resolveLabelPositions(
  entries: readonly OutlineEntry[],
  trackHeight: number,
  labelHeight: number,
  minGap: number,
): OutlineEntry[] {
  if (entries.length === 0) {
    return [];
  }

  const maxY = Math.max(0, trackHeight - labelHeight);
  const separation = Math.max(0, labelHeight + minGap);
  const positions = entries.map((entry) => (
    Math.min(maxY, Math.max(0, entry.progress * trackHeight - labelHeight / 2))
  ));

  for (let index = 1; index < positions.length; index += 1) {
    positions[index] = Math.max(positions[index], positions[index - 1] + separation);
  }

  if (positions[positions.length - 1] > maxY) {
    positions[positions.length - 1] = maxY;
    for (let index = positions.length - 2; index >= 0; index -= 1) {
      positions[index] = Math.min(positions[index], positions[index + 1] - separation);
    }
  }

  if (positions[0] < 0) {
    const usableGap = positions.length === 1 ? 0 : maxY / (positions.length - 1);
    for (let index = 0; index < positions.length; index += 1) {
      positions[index] = index * usableGap;
    }
  }

  return entries.map((entry, index) => ({
    ...entry,
    labelY: positions[index],
  }));
}

export function activeHeadingIndex(
  entries: readonly OutlineEntry[],
  scrollTop: number,
  activationOffset: number,
): number {
  const threshold = scrollTop + activationOffset;
  let low = 0;
  let high = entries.length - 1;
  let active = -1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (entries[middle].documentY <= threshold) {
      active = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return active;
}
