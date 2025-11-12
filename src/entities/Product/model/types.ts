export interface ProductCardType {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  sort: number;
  label: string | null;
}

export interface ProductDetailsType extends ProductCardType {
  description: string | null;
  gallery: {
    directus_files_id: string;
  }[];
}
