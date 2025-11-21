import type { Component } from "vue";
import { CollectionType } from "~/src/shared/api";
import Banner from "../ui/blocks/Banner.vue";
import Categories from "../ui/blocks/Categories.vue";
import Slider from "../ui/blocks/Slider.vue";
import Products from "../ui/blocks/Products.vue";
import Reviews from "../ui/blocks/Reviews.vue";
import RichTextEditor from "../ui/blocks/RichTextEditor.vue";

export const pageBlocksMapper: Record<string, Component> = {
  [CollectionType.BLOCKS_BANNER]: Banner,
  [CollectionType.BLOCKS_CATEGORIES_CAROUSEL]: Categories,
  [CollectionType.BLOCKS_HERO]: Slider,
  [CollectionType.BLOCKS_PRODUCTS_GRID]: Products,
  [CollectionType.BLOCKS_REVIEWS]: Reviews,
  [CollectionType.BLOCKS_RICH_TEXT_EDITOR]: RichTextEditor,
};
