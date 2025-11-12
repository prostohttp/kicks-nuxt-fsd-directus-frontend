import type { Component } from "vue";
import Banner from "../ui/blocks/Banner.vue";
import Categories from "../ui/blocks/Categories.vue";
import Products from "../ui/blocks/Products.vue";
import Reviews from "../ui/blocks/Reviews.vue";
import Slogan from "../ui/blocks/Slogan.vue";
import Slider from "../ui/blocks/Slider.vue";

export const homeBlocksMapper: Record<number, Component> = {
  17: Banner,
  14: Slogan,
  8: Slider,
  9: Products,
  10: Categories,
  11: Reviews,
};
