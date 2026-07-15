export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function calculateProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const maxScroll = Math.max(0, scrollHeight - clientHeight);
  return maxScroll === 0 ? 0 : clamp01(scrollTop / maxScroll);
}

export function calculateTickCount(
  trackHeight: number,
  targetSpacing = 10,
): number {
  return Math.min(120, Math.max(12, Math.round(trackHeight / targetSpacing)));
}

export function progressFromPointer(
  clientY: number,
  trackTop: number,
  trackHeight: number,
): number {
  return trackHeight <= 0 ? 0 : clamp01((clientY - trackTop) / trackHeight);
}
