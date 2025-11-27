import type { BannerType } from "../../ui/Banner";
import type { SeoType } from "./seo";

export interface CategoryType {
  id: number;
  title: string;
  slug: string;
  description?: string;
  show_filter: boolean;
  thumbnail: string;
  seo: SeoType;
  banner: BannerType | null;
  children: number[];
}
