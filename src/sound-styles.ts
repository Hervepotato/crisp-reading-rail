export const READING_RAIL_SOUND_STYLE_OPTIONS = [
  {
    value: "followFileExplorer",
    label: "跟随 Crisp File Explorer",
  },
  { value: "soft", label: "轻柔滴答" },
  { value: "scale", label: "马林巴八音盒音阶" },
  { value: "wooden", label: "清脆木块" },
  { value: "mechanical", label: "机械青轴" },
  { value: "raindrop", label: "水晶水滴" },
  { value: "retro8bit", label: "复古 8-bit 游戏" },
  { value: "watchgear", label: "复古腕表齿轮" },
  { value: "bubble", label: "泡泡破裂" },
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
