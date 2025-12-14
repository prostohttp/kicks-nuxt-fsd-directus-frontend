import type { ApiProductActiveOptionType, SeoType } from "~/src/shared/api";

export interface ProductCardType {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  sort?: number;
  label: string | null;
}

export interface ProductDetailsType extends ProductCardType {
  seo: SeoType;
  description: string | null;
  gallery: {
    directus_files_id: string;
  }[];
  option_values: ApiProductActiveOptionType[];
  related_products: {
    related_products_id: ProductCardType;
  }[];
}
