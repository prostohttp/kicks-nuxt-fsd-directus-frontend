<script setup lang="ts">
import {
  Pagination as CarouselPagination,
  Carousel,
} from "vue3-carousel/dist/carousel";
import { ProductCard, type ProductCardType } from "~/src/entities/Product";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import { HeadingWith, MediumHeading } from "~/src/shared/ui/heading";

const { products } = defineProps<{
  products: {
    related_products_id: ProductCardType;
  }[];
}>();

const carouselConfig = {
  gap: 16,
  breakpointMode: "carousel",
  wrapAround: true,
  itemsToShow: 4,
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

const productCarousel = ref();
</script>

<template>
  <section class="related-products">
    <HeadingWith>
      <template #left>
        <MediumHeading heading="You may also like" />
      </template>
      <template #right>
        <CarouselNavigation
          @prev="productCarousel.prev()"
          @next="productCarousel.next()"
        />
      </template>
    </HeadingWith>
    <div class="related-products__carousel">
      <div class="related-products__carousel__cards">
        <Carousel v-bind="carouselConfig" ref="productCarousel">
          <Slide
            v-for="{ related_products_id: product } in products"
            :key="product.id"
          >
            <ProductCard v-bind="product" />
          </Slide>
          <template #addons>
            <CarouselPagination />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
