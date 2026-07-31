export const READING_RAIL_SOUND_STYLE_OPTIONS = [
  {
    value: "followFileExplorer",
    label: "Follow Crisp File Explorer",
  },
  { value: "soft", label: "Soft tick" },
  { value: "scale", label: "Marimba music box scale" },
  { value: "wooden", label: "Crisp wooden block" },
  { value: "mechanical", label: "Mechanical blue switch" },
  { value: "raindrop", label: "Crystal water drop" },
  { value: "retro8bit", label: "Retro 8-bit game" },
  { value: "watchgear", label: "Vintage watch gear" },
  { value: "bubble", label: "Bubble pop" },
] as const;

export type ReadingRailSoundStyle =
  typeof READING_RAIL_SOUND_STYLE_OPTIONS[number]["value"];

const SOUND_STYLES = new Set<string>(
  READING_RAIL_SOUND_STYLE_OPTIONS.map((option) => option.value),
);

export function normalizeSoundStyle(value: unknown): ReadingRailSoundStyle {
  return typeof value === "string" && SOUND_STYLES.has(value)
    ? value as ReadingRailSoundStyle
    : "followFileExplorer";
}

export function normalizeResolvedSoundStyle(
  value: unknown,
): Exclude<ReadingRailSoundStyle, "followFileExplorer"> {
  if (value === "wood") {
    return "wooden";
  }
  if (value === "digital") {
    return "mechanical";
  }
  const normalized = normalizeSoundStyle(value);
  return normalized === "followFileExplorer" ? "soft" : normalized;
}
