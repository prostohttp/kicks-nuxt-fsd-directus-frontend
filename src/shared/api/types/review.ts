import type { ImageType } from "./image";

export interface ReviewType {
  id: number;
  user_created: {
    avatar: string;
  };
  review: string;
  product: {
    slug: string;
  };
  rating: number;
  title: string;
  gallery: ImageType[];
}
