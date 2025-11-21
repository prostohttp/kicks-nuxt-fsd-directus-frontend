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
  rating: number;
}
