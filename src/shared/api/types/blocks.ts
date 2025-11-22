import type { CollectionType } from "./collection";

export interface BlockSliderType {
  slider: {
    key: string;
    collection: CollectionType.SLIDERS;
  };
}

export interface BlockProductType {
  heading?: string;
  is_carousel: boolean;
  limit: number;
  collection: CollectionType;
  columns: number;
  label?: string;
  button_url?: string;
  button_text?: string;
  paginatable?: boolean;
  per_page?: number;
}

export interface BlockCategoryType {
  heading: string;
  collection: CollectionType;
  limit: number;
  columns: number;
}

export interface BlockReviewsType {
  heading: string;
  collection: CollectionType;
  limit: number;
  columns: number;
  button_url?: string;
  button_text?: string;
}

export interface BlockRichTextEditorType {
  id: string;
  title?: string;
  text: string;
}
