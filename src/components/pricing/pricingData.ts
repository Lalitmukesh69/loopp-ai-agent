/* ───── Pricing Plans Data ───── */

export interface PricingFeature {
  text: string;
  info: boolean;
  tooltip?: string;
  badge?: string;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  cta: string;
  ctaStyle: 'primary' | 'dark';
  secondaryCta: string | null;
  prefix: string | null;
  features: PricingFeature[];
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    tagline: 'Great for a free taste of Loop',
    price: '$0',
    unit: 'per user per month',
    cta: 'Try Loop',
    ctaStyle: 'primary',
    secondaryCta: null,
    prefix: null,
    features: [
      { text: 'AI meeting notes', info: false },
      { text: 'See limited meeting history', info: true, tooltip: 'Free users can access their most recent 25 meetings. Upgrade to Business for unlimited history.' },
      { text: 'AI chat within and across meetings', info: false },
      { text: 'Shared folders for collaboration', info: false },
      { text: 'Customized note templates', info: false },
      { text: 'Multi-language support', info: false },
      { text: 'Opt out of model training any time', info: false },
    ],
  },
  {
    name: 'Pro',
    tagline: 'Great for individuals or small teams',
    price: '$49',
    unit: 'total per month',
    cta: 'Try Loop',
    ctaStyle: 'primary',
    secondaryCta: null,
    prefix: 'Everything in Basic, plus',
    features: [
      { text: 'Unlimited meeting notes and history', info: false },
      { text: 'Access to advanced AI thinking models', info: false },
      { text: 'Advanced integrations with Attio, Notion, Slack, Hubspot, Affinity, and Zapier', info: false },
      { text: 'Centralized billing & user management', info: false },
      { text: 'MCP integration in all your apps', info: true, tooltip: 'Model Context Protocol lets Loop integrate directly into your favorite apps and workflows.' },
      { text: 'Personal API access', info: false },
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'Great for larger companies',
    price: 'Custom',
    unit: '',
    cta: 'Sign-up in app',
    ctaStyle: 'dark',
    secondaryCta: 'Learn more',
    prefix: 'Everything included in Pro',
    features: [
      { text: 'Enterprise-grade security & admin controls', info: false },
      { text: 'Single sign-on (SSO)', info: true, tooltip: 'SAML 2.0 and OpenID Connect support for Okta, Azure AD, Google Workspace, and more.' },
      { text: 'Priority support and usage analytics', info: false },
      { text: 'Enterprise API access', info: false },
      { text: 'Org-wide auto-deletion periods', info: false },
      { text: 'Admin controls for sharing & API access', info: false },
      { text: 'Opt out of model training for everyone in your team', info: true, tooltip: 'On non-Enterprise workspaces, any user can turn off model training with a few clicks. On Enterprise workspaces, all users are opted out by default.' },
      { text: 'Org-wide notification that Loop is being used', info: false, badge: 'PILOT' },
    ],
  },
];
