/* ───── FAQ Data ───── */

export interface FAQEntry {
  q: string;
  a: string;
}

export const faqData: FAQEntry[] = [
  {
    q: "What's the difference between Enterprise and Business?",
    a: "Enterprise includes everything in Business plus advanced security features like SSO, org-wide admin controls, priority support, enterprise API access, and the ability to enforce data policies across your entire organization. It's designed for teams that need centralized management and compliance features.",
  },
  {
    q: "What admin controls will I have?",
    a: "Enterprise admins can manage user access and permissions, configure SSO, set org-wide auto-deletion periods, control sharing and API access policies, and manage model training opt-outs for the entire team. You'll have a dedicated admin dashboard for full visibility.",
  },
  {
    q: "What are your integration capabilities?",
    a: "Loop integrates with Attio, Notion, Slack, Hubspot, Affinity, and Zapier on the Business plan. Enterprise customers also get access to our Enterprise API for building custom integrations, plus MCP integration that works across all your apps.",
  },
  {
    q: "Do you train any models on my data?",
    a: "No, we do not train models on your data by default. All users can opt out of model training at any time. Enterprise customers can enforce this opt-out across their entire organization, ensuring no team member's data is ever used for training.",
  },
  {
    q: "Is Loop SOC 2 / HIPAA compliant?",
    a: "Yes, Loop is SOC 2 Type II compliant and we maintain rigorous security standards. For HIPAA compliance and other regulatory requirements, please contact our enterprise sales team to discuss your specific needs and how we can support them.",
  },
  {
    q: "Does Loop have SSO?",
    a: "Yes, Single Sign-On (SSO) is available on our Enterprise plan. We support all major identity providers including Okta, Azure AD, Google Workspace, and OneLogin. SSO makes it easy to manage access and enforce security policies across your organization.",
  },
  {
    q: "What SSO providers do you support?",
    a: "We support SAML 2.0 and OpenID Connect, which means compatibility with Okta, Azure Active Directory, Google Workspace, OneLogin, PingFederate, and most other enterprise identity providers. Custom SSO configurations are available upon request.",
  },
  {
    q: "How do you notify other participants that Loop is being used?",
    a: "Enterprise customers on the Pilot program can enable an org-wide notification that informs meeting participants when Loop is active. This ensures transparency and builds trust. The notification appears at the start of each meeting and can be customized to match your organization's communication preferences.",
  },
];
