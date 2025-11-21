import type { SeoType } from "./seo";

export interface CategoryType {
  id: number;
  title: string;
  slug: string;
  description?: string;
  thumbnail: string;
  seo: SeoType;
  banner: string | null;
  products: number[];
  children: number[];
}
