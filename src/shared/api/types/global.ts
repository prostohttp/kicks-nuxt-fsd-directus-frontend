import type { SeoType } from "./seo";

export interface SocialLink {
  url: string;
  service: string;
}

export interface GlobalType {
  title: string;
  url: string;
  logo: string;
  logo_dark_mode: string;
  favicon: string;
  accent_color: string;
  tagline: string;
  description: string;
  copyright: string;
  social_links: SocialLink[];
  seo_data: SeoType;
}
