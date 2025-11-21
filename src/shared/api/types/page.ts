import type { CollectionType } from "./collection";
import type { SeoType } from "./seo";

export interface BlockType {
  item: string;
  collection: CollectionType;
}

export interface PageType {
  id: number;
  permalink: string;
  seo_data: SeoType;
  blocks: BlockType[];
}
