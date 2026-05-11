/**
 * ═══════════════════════════════════════════════════════════════
 *  MARKETING THEME — Single Source of Truth for Colors
 * ═══════════════════════════════════════════════════════════════
 *
 *  Every core color used across the marketing / landing pages is
 *  defined here. To change the brand's color palette, just update
 *  the hex values in this file.
 *
 *  These values are imported into tailwind.config.ts and can also
 *  be used directly in components if needed.
 * ═══════════════════════════════════════════════════════════════
 */

export const MARKETING_COLORS = {
  /** Primary brand color (e.g., used for main buttons, highlights) */
  primary: "#4b6319",
  /** Contrast color for text/icons on top of primary color */
  onPrimary: "#ffffff",
  
  /** Container version of primary (often used for background blocks) */
  primaryContainer: "#4b6319",
  /** Contrast color for text/icons inside primaryContainer */
  onPrimaryContainer: "#c1de86",

  /** Secondary brand color (more subtle than primary) */
  secondary: "#576341",
  /** Contrast color for text/icons on top of secondary color */
  onSecondary: "#ffffff",

  /** Tertiary color for accents */
  tertiary: "#662e63",
  /** Contrast color for text/icons on top of tertiary color */
  onTertiary: "#ffffff",

  /** Main background color of the pages */
  background: "#ffffff",
  /** Main surface color (e.g., cards, sections) */
  surface: "#ffffff",
  /** Standard text color on surface/background */
  onSurface: "#1a1c1b",

  /** Subtle variants for borders and dividers */
  outline: "#75796a",
  outlineVariant: "#c5c8b7",

  /** Surface variations for depth */
  surfaceVariant: "#e2e3e1",
  surfaceContainerLow: "#f4f4f2",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerHigh: "#e8e8e6",
  surfaceContainerHighest: "#e2e3e1",

  /** Error states */
  error: "#ba1a1a",
  onError: "#ffffff",
} as const;

/**
 * Helper to get a color with opacity
 * Usage: MARKETING_COLORS_ALPHA.primary(0.5) => "rgba(75, 99, 25, 0.5)"
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
