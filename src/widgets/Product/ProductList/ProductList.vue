<script setup lang="ts">
import { ProductCard, useProductStore } from "~/src/entities/Product";
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/Button";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import {
  HeadingWith,
  LargeHeading,
  SmallHeading,
} from "~/src/shared/ui/heading";

const { settings, label } = defineProps<{
  settings: BlockProductType;
  label?: string;
}>();

const productCarousel = ref();
const carouselConfig = {
  gap: 16,
  breakpointMode: "carousel",
  wrapAround: true,
  snapAlign: "start",
  breakpoints: {
    991: {
      itemsToShow: 4,
    },
    300: {
      itemsToShow: 2,
    },
  },
} as const;

const { heading, is_carousel, button_text, button_url, columns, limit } =
  settings;

const productStore = useProductStore();
const { data } = useQuery({
  key: ["home-product-list"],
  query: async () =>
    await productStore.getAllProducts(CollectionType.PRODUCTS, limit, {
      label: { _eq: label },
    }),
});

const prevHandler = () => productCarousel.value?.prev();
const nextHandler = () => productCarousel.value?.next();

const columnClass = () =>
  columns === 2 ? "two-column" : columns === 3 ? "three-column" : null;
</script>

<template>
  <section class="product-list">
    <div v-if="is_carousel" class="product-list__carousel">
      <HeadingWith>
        <template #heading>
          <SmallHeading v-if="heading" :heading />
        </template>
        <template #nav>
          <CarouselNavigation @prev="prevHandler" @next="nextHandler" />
        </template>
      </HeadingWith>
      <div class="product-list__cards">
        <Carousel v-bind="carouselConfig" ref="productCarousel">
          <Slide v-for="product in data" :key="product.id">
            <ProductCard v-bind="product" />
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
      <div class="product-list__dots"></div>
    </div>
    <div v-else class="product-list__grid">
      <HeadingWith>
        <template #heading>
          <LargeHeading v-if="heading" :heading />
        </template>
        <template #button>
          <NuxtLink :to="button_url">
            <Button
              variant="fill"
              size="large"
              style="background-color: #416aea"
            >
              {{ button_text }}
            </Button>
          </NuxtLink>
        </template>
      </HeadingWith>
      <div class="product-list__cards">
        <div :class="['product-list__cards__wrapper', columnClass()]">
          <ProductCard
            v-for="product in data"
            :key="product.id"
            v-bind="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
