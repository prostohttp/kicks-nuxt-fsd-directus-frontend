import type { ImageType } from "./image";

export interface ReviewType {
  id: number;
  user_created: {
    id: string;
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

export interface AddReviewType {
  title: string;
  review: string;
  rating: number;
  product: number | undefined;
  user_created: string
}

export interface AddedReviewType extends AddReviewType {
  id: number;
  gallery: number[];
}

export interface ReviewFileType {
  id: number | undefined;
  reviews_id: number | undefined;
  directus_files_id: string | undefined;
}
