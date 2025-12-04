import type { SeoType } from "./seo";

export interface ProductType {
  id: number;
  title: string;
  image: string;
  seo: SeoType;
  description: string;
  related_products: number[];
  label?: string;
  price: number;
  gallery: {
    directus_files_id: string;
  }[];
  option_values: {
    option_values_id: string;
  }[];
}

export type ApiFilterType = Record<string, unknown>;
