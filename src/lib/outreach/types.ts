export type Lead = {
  id: string;
  business: string;
  owner: string | null;
  phone: string | null;
  email: string;
  emailQuality: string | null;
  city: string | null;
  state: string | null;
  tier: string | null;
  score: number | null;
  focus: string | null;
  advertises24x7: boolean;
  hook: string | null;
  emailOpener: string | null;
  reviews: number | null;
};

export type Demo = {
  id: string;
  leadId: string;
  token: string;
  url: string;
  expiresAt: string;
};

export type EmailPreview = {
  lead: Lead;
  demo: Demo;
  subject: string;
  text: string;
  html: string;
};
