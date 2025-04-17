// Client-side SEO analysis types

export interface CoreTags {
  title?: string;
  description?: string;
  charset?: string;
  viewport?: string;
  canonical?: string;
  language?: string;
  robots?: string;
}

export interface SocialTags {
  ogTags?: Record<string, string>;
  twitterTags?: Record<string, string>;
  otherTags?: Record<string, string>;
}

export interface TagStatus {
  status: "good" | "warning" | "error";
  message?: string;
}

export interface SEOIssue {
  type: "error" | "warning" | "info";
  message: string;
  recommendation: string;
}

export interface BestPractice {
  name: string;
  implemented: boolean;
  description?: string;
}

export interface SEOScore {
  value: number;
  category: "good" | "fair" | "poor";
  implementedPractices: number;
  totalPractices: number;
}
