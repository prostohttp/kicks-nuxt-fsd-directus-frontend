export interface ApiProductType {
  meta: {
    total_count?: number;
    filter_count?: number;
  };
  data: Array<{
    id: number;
    title: string;
    slug: string;
    image: string;
    description: string | null;
    label: string | null;
    sort: number;
    rating: number;
    price: number;
    gallery: {
      directus_files_id: string;
    }[];
  }>;
}

export type ApiProductsCount = "total_count" | "filter_count" | "*";
