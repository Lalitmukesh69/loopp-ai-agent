/* ───── Pricing Module Barrel Export ───── */

// Data
export { pricingPlans } from './pricingData';
export type { PricingPlan, PricingFeature } from './pricingData';
export { faqData } from './faqData';
export type { FAQEntry } from './faqData';
export { tweetsData, socialProofCompanies } from './testimonialsData';
export type { TweetData, SocialProofCompany } from './testimonialsData';

// Icons & Shared Components
export { CheckIcon, PlusCircleIcon, InfoTooltip, ChevronDown, VerifiedBadge, HeartIcon } from './PricingIcons';

// Section Components
export { default as PricingStyles } from './PricingStyles';
export { default as PricingCards } from './PricingCards';
export { default as TestimonialQuote } from './TestimonialQuote';
export { default as FAQSection } from './FAQSection';
export { default as ResourcesSection } from './ResourcesSection';
export { default as TwitterTestimonials } from './TwitterTestimonials';
export { default as SocialProof } from './SocialProof';
