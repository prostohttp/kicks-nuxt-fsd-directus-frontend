export interface ApiProductType {
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
}
