import type { CollectionType } from "./collection";

export interface BlockSliderType {
  slider: {
    key: string;
    collection: CollectionType.SLIDERS;
  };
}

export interface BlockProductType {
  heading: string;
  button_url: string;
  is_carousel: boolean;
  limit: number;
  columns: number;
  button_text: string;
}

export interface BlockCategoryType {
  heading: string;
  collection: CollectionType;
  limit: number;
  columns: number;
}
