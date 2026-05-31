export const VISUAL_THEMES = [
  "horror-archive",
  "vhs",
  "minimal",
] as const;

export type VisualTheme = (typeof VISUAL_THEMES)[number];

export const VISUAL_THEME_LABELS: Record<VisualTheme, string> = {
  "horror-archive": "Horror Archive",
  vhs: "VHS",
  minimal: "Minimal",
};
