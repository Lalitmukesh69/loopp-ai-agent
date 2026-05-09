import type { Config } from "tailwindcss";
import { MARKETING_COLORS } from "./src/data/marketingTheme";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "outline-variant": MARKETING_COLORS.outlineVariant,
        "tertiary": MARKETING_COLORS.tertiary,
        "on-tertiary-container": "#ffc0f5",
        "error": MARKETING_COLORS.error,
        "on-tertiary-fixed": "#370237",
        "primary-container": MARKETING_COLORS.primaryContainer,
        "on-primary-container": MARKETING_COLORS.onPrimaryContainer,
        "surface-tint": "#4e661c",
        "on-primary-fixed": "#141f00",
        "on-background": "#1a1c1b",
        "secondary": MARKETING_COLORS.secondary,
        "tertiary-fixed": "#ffd7f6",
        "surface-bright": "#f9f9f7",
        "on-secondary-container": "#5d6946",
        "on-primary": MARKETING_COLORS.onPrimary,
        "surface-container-lowest": MARKETING_COLORS.surfaceContainerLowest,
        "surface-container-highest": MARKETING_COLORS.surfaceContainerHighest,
        "surface-variant": MARKETING_COLORS.surfaceVariant,
        "on-error-container": "#93000a",
        "on-tertiary-fixed-variant": "#6a3166",
        "surface-container-high": MARKETING_COLORS.surfaceContainerHigh,
        "secondary-fixed": "#dbe8bd",
        "on-surface": MARKETING_COLORS.onSurface,
        "surface-container-low": MARKETING_COLORS.surfaceContainerLow,
        "error-container": "#ffdad6",
        "inverse-on-surface": "#f1f1ef",
        "primary-fixed": "#cfee93",
        "tertiary-container": "#81467c",
        "primary": MARKETING_COLORS.primary,
        "tertiary-fixed-dim": "#f7afed",
        "inverse-primary": "#b4d17a",
        "surface-container": "#eeeeec",
        "inverse-surface": "#2f3130",
        "on-error": MARKETING_COLORS.onError,
        "surface": MARKETING_COLORS.surface,
        "on-surface-variant": "#45483b",
        "on-primary-fixed-variant": "#374e03",
        "on-secondary": MARKETING_COLORS.onSecondary,
        "primary-fixed-dim": "#b4d17a",
        "background": MARKETING_COLORS.background,
        "secondary-container": "#dbe8bd",
        "on-secondary-fixed": "#151e04",
        "surface-dim": "#dadad8",
        "secondary-fixed-dim": "#bfcca2",
        "on-secondary-fixed-variant": "#404b2b",
        "outline": MARKETING_COLORS.outline,
        "on-tertiary": MARKETING_COLORS.onTertiary,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        serif: ["Raleway", "sans-serif"],
        mono: ["Raleway", "sans-serif"],
        "headline": ["Raleway", "sans-serif"],
        "body": ["Raleway", "sans-serif"],
        "label": ["Raleway", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
