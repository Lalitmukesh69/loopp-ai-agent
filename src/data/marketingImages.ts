/**
 * ═══════════════════════════════════════════════════════════════
 *  MARKETING IMAGES — Single Source of Truth
 * ═══════════════════════════════════════════════════════════════
 *
 *  Every image URL used across the marketing / landing pages is
 *  defined here.  To swap an image, just change the URL in this
 *  file — every page that references it will update automatically.
 *
 *  After editing a URL, search for its constant name in the
 *  codebase to see which components use it.
 * ═══════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────
//  HERO SECTION  (Landing Page)
// ─────────────────────────────────────────────

/** Female participant shown in the hero avatar stack */
export const HERO_PARTICIPANT_1 =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200";

/** Male participant shown in the hero avatar stack */
export const HERO_PARTICIPANT_2 =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200";

// ─────────────────────────────────────────────
//  PLATFORM SECTION  (Landing Page)
// ─────────────────────────────────────────────

/** Testimonial avatar — "John Borthwick, Investor, Betaworks" */
export const PLATFORM_TESTIMONIAL_AVATAR =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150";

/** Slack integration logo */
export const PLATFORM_SLACK_LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAsJqnE6kiOhngsbkvbrfevAo7nsOflR8Gm7MDnCQhSQ7zJhbehcnYVD-tblzKtwSgDYnLPMfR2pjcZ2_-lOBwTIfSvS-gxtgnI7dJ2rYlPS7CgK5B_YYV4z_3iBOJutH8LbJKisx5Fm9OKoHjJZlm4pdqssgAdgTt4u66yqlpPXC_WtRIGasF1MOikDm0-OaXOdNWZhslYPbIYeamLhlL95nyarhtDC6Cyv-KMbAEALCkzjKIumzdKgj9lYQ3tygcqqhr8DworFRdS";

/** Google Meet integration logo */
export const PLATFORM_MEET_LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDM3D8Ca9dZNdU4qmksyB1012P_mIKo65ZXLTEHtiCx8Jbx9xh7v2CkY2MVN_Y6n72IhveyqYaQB2RPsRjtmLGK_BzmUxPpTuGlmc_3tvfPmen6QurXjr_XLDqNKLVufj-4FNw2DnnNJb0pBt28mUHXon5CGYwPQsBCiTzci0DbrtUf3hZtqOr-9_JK2ZW4lX1aeluutkZerwGTJSA89UsJeYHiHYzhAeo8zZnYyEIkvQJ-IhHTbeu8fEb78PeHVBSkW-k-LjbxAEvt";

/** Microsoft Teams integration logo */
export const PLATFORM_TEAMS_LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtLX87TTgwSLueyZQ2C168ZFYcTNsEQf0D-K1Sgg0Yw-8iFFR8THQif-n0viX8cPSmTdHMPMm_kITaTQgtRRuGBenNVwFZdlJya4ylcQKZCJQ31icXkMi5myCscvMEV5NbWg-CHoWM4fC84OkDovXnDiyrdoS3dgctHaztXBltZvf9kYwwJMkEL8bE8IqKH5kj-5M8HUE28FxM3p4MXEtKnWpgAMZ79TA_FmkoK4CLTZnPKkvAzC2Hm0dA0HLFr5oD97H1RYpoqUx1";

/** Cisco Webex integration logo */
export const PLATFORM_WEBEX_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cisco_Webex_logo.svg/1024px-Cisco_Webex_logo.svg.png";

// ─────────────────────────────────────────────
//  POST-MEETING SECTION  (Landing Page)
// ─────────────────────────────────────────────

/** Testimonial avatar — "Adriana Vitagliano, VC, Firstminute" */
export const POST_MEETING_TESTIMONIAL_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAD71UVxd21cGO9eqDk9pXiqZ3yE_tYnOZUvePBhhkctAYqH-ZCtdp67mePDcIGa10WIHtqp9R-vA6UgqF_tXZrQvQ4XNL5MCcGSJ1hRgMXASft79sI0dyo9i6lXdQffLnAALBJ3WgqklGQLEuOvL6jjEEUbCBtZdvtmHoxmeOUX6LAfrE04BFNxWvLLtrF4ub-FM9-lLSPgF5Neixuo3KnmQ5G-qiGiOP1q761YdPOuD4iPQSwY6mfZt3JfCevpvmCMK1wYTVsMzKg";

// ─────────────────────────────────────────────
//  TESTIMONIALS / SOCIAL PROOF  (Landing + Pricing)
// ─────────────────────────────────────────────

/** Testimonial avatars used in tweet cards (landing & pricing pages) */
export const TESTIMONIAL_AVATARS = {
  natFriedman: "https://i.pravatar.cc/150?img=11",
  chrisPedregal: "https://i.pravatar.cc/150?img=14",
  danShipper: "https://i.pravatar.cc/150?img=59",
  soleio: "https://i.pravatar.cc/150?img=68",
  guillermoRauch: "https://i.pravatar.cc/150?img=15",
  mds: "https://i.pravatar.cc/150?img=51",
} as const;

// ─────────────────────────────────────────────
//  PRICING PAGE — Testimonial Quote
// ─────────────────────────────────────────────

/** Avatar for "Lalit Mukesh, Founder & CEO, IRM" testimonial */
export const PRICING_TESTIMONIAL_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150";

// ─────────────────────────────────────────────
//  PRODUCT USE-CASE PAGE
// ─────────────────────────────────────────────

/** Video-call mockup — "PM Meeting 1" (professional woman) */
export const PRODUCT_HERO_CALLER_1 =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";

/** Video-call mockup — "PM Meeting 2" (professional woman) */
export const PRODUCT_HERO_CALLER_2 =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";

/** Testimonial avatar — "Elena Rossi, Product Lead, Vercel" */
export const PRODUCT_TESTIMONIAL_AVATAR =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80";

// ─────────────────────────────────────────────
//  SALES USE-CASE PAGE
// ─────────────────────────────────────────────

/** Video-call mockup — "Caller 1" (woman) */
export const SALES_HERO_CALLER_1 =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";

/** Video-call mockup — "Caller 2" (man) */
export const SALES_HERO_CALLER_2 =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";

/** Testimonial avatar — "John Borthwick, Investor, Betaworks" */
export const SALES_TESTIMONIAL_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80";

// ─────────────────────────────────────────────
//  SHARED AVATARS  (used across hero cards,
//  mockup lists, and "how it works" sections)
// ─────────────────────────────────────────────

/**
 * Generic placeholder avatars used in mockup UIs
 * (meeting lists, shared-with-me panels, etc.)
 *
 * Key = pravatar image id, used to build the full URL.
 * Usage:  `https://i.pravatar.cc/150?img=${AVATAR_IDS.carolineJon}`
 */
export const AVATAR_IDS = {
  /** Used for: Caroline/Jon entries, ProductHero, SalesHero, WhyDifferentSection */
  avatar32: "32",
  /** Used for: Shreman/Ben entries, ProductHero, SalesHero, WhyDifferentSection, SalesHowItWorks */
  avatar11: "11",
  /** Used for: Shreman/Vincent entries, ProductHero, SalesHero, WhyDifferentSection */
  avatar68: "68",
  /** Used for: Caroline/Arthur entries, ProductHero, SalesHero, SalesHowItWorks */
  avatar47: "47",
  /** Used for: Jon/Shreman — SalesHero only */
  avatar12: "12",
} as const;

/** Helper: builds a full pravatar URL from an avatar id */
export const pravatarUrl = (id: string, size = 150): string =>
  `https://i.pravatar.cc/${size}?img=${id}`;
