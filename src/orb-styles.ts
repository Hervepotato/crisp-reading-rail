import { INLINE_ORB_SVGS as GENERATED_INLINE_ORB_SVGS } from "./orb-svgs.generated";

export const RANDOM_DAILY_ORB_STYLES = [
  "soccer",
  "basketball",
  "redball",
  "tennis",
  "clown",
  "dragonball",
  "christmasball",
  "orangeball",
  "blueball",
  "character1",
  "character2",
  "character3",
  "fear",
  "devil",
  "fan",
  "gear",
  "alfresco",
  "mercedes",
  "taiga",
] as const;

export type MaterialOrbStyle = (typeof RANDOM_DAILY_ORB_STYLES)[number];
export type OrbStyleSetting =
  | "followFileExplorer"
  | "default"
  | "randomDaily"
  | MaterialOrbStyle;
export type ResolvedOrbStyle = "default" | MaterialOrbStyle;

export const ORB_STYLE_OPTIONS: ReadonlyArray<{
  value: OrbStyleSetting;
  label: string;
}> = [
  { value: "followFileExplorer", label: "Follow Crisp File Explorer" },
  { value: "default", label: "Default" },
  { value: "randomDaily", label: "Random per day" },
  { value: "soccer", label: "Soccer" },
  { value: "basketball", label: "Basketball" },
  { value: "redball", label: "Red ball" },
  { value: "tennis", label: "Tennis" },
  { value: "clown", label: "Clown" },
  { value: "dragonball", label: "Dragon Ball" },
  { value: "christmasball", label: "Christmas Ball" },
  { value: "orangeball", label: "Orange Ball" },
  { value: "blueball", label: "Blue Ball" },
  { value: "character1", label: "Character 1" },
  { value: "character2", label: "Character 2" },
  { value: "character3", label: "Character 3" },
  { value: "fear", label: "Fear" },
  { value: "devil", label: "Devil" },
  { value: "fan", label: "Ventilation fan" },
  { value: "gear", label: "Gear" },
  { value: "alfresco", label: "Alfresco" },
  { value: "mercedes", label: "Mercedes-Benz" },
  { value: "taiga", label: "Taiga" },
];

export const INLINE_ORB_SVGS: Partial<Record<MaterialOrbStyle, string>> =
  GENERATED_INLINE_ORB_SVGS;

export const IMAGE_ORB_ASSETS: Partial<Record<MaterialOrbStyle, string>> = {
  character1: "assets/character1.png",
  character2: "assets/character2.png",
  character3: "assets/character3.png",
  fear: "assets/fear.svg",
  devil: "assets/devil.svg",
  fan: "assets/fan.svg",
  gear: "assets/gear.svg",
  alfresco: "assets/alfresco.svg",
  mercedes: "assets/mercedes.svg",
  taiga: "assets/taiga.svg",
};

export const STATIC_ORB_STYLES = new Set<MaterialOrbStyle>([
  "character1",
  "character2",
  "character3",
]);

const VALID_SETTINGS = new Set<OrbStyleSetting>([
  "followFileExplorer",
  "default",
  "randomDaily",
  ...RANDOM_DAILY_ORB_STYLES,
]);
const MATERIAL_STYLES = new Set<MaterialOrbStyle>(RANDOM_DAILY_ORB_STYLES);

export function normalizeOrbStyle(value: unknown): OrbStyleSetting {
  return typeof value === "string" && VALID_SETTINGS.has(value as OrbStyleSetting)
    ? (value as OrbStyleSetting)
    : "default";
}

export function resolveOrbStyle(
  value: unknown,
  ownerDocument: Document,
  date = new Date(),
): ResolvedOrbStyle {
  const style = normalizeOrbStyle(value);

  if (style === "randomDaily") {
    return RANDOM_DAILY_ORB_STYLES[
      hashString(getLocalDateKey(date)) % RANDOM_DAILY_ORB_STYLES.length
    ];
  }

  if (style === "followFileExplorer") {
    const companionValue = ownerDocument
      .querySelector(".crisp-fe-orb[data-orb-style]")
      ?.getAttribute("data-orb-style");
    return isMaterialOrbStyle(companionValue) ? companionValue : "default";
  }

  return style;
}

function isMaterialOrbStyle(value: unknown): value is MaterialOrbStyle {
  return typeof value === "string" && MATERIAL_STYLES.has(value as MaterialOrbStyle);
}

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}
