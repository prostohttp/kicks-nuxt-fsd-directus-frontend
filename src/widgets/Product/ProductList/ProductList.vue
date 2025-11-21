<script setup lang="ts">
import { ProductCard, useProductStore } from "~/src/entities/Product";
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { Preloader } from "~/src/shared/ui/preloader";

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

const { is_carousel, columns, limit } = settings;

const productStore = useProductStore();
const { data, isLoading } = useQuery({
  key: ["home-product-list"],
  query: async () =>
    await productStore.getAllProducts(CollectionType.PRODUCTS, limit, {
      label: { _eq: label },
    }),
});

const columnClass = () =>
  columns === 2 ? "two-column" : columns === 3 ? "three-column" : null;
defineExpose({
  productCarousel,
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="product-list">
    <EmptyDataHeading v-if="!data?.length" />
    <div v-if="is_carousel" class="product-list__carousel">
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
    </div>
    <div v-else class="product-list__grid">
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
