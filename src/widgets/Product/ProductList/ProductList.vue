<script setup lang="ts">
import {
  Pagination as CarouselPagination,
  Carousel,
} from "vue3-carousel/dist/carousel";
import { ProductCard, useProductStore } from "~/src/entities/Product";
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { Pagination } from "~/src/shared/ui/Pagination";

const { settings } = defineProps<{
  settings: BlockProductType;
}>();
const { is_carousel, columns, limit } = settings;

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

const productStore = useProductStore();
const filter = computed(() =>
  settings.label
    ? {
        label: { _eq: settings.label },
      }
    : undefined,
);

const route = useRoute();
const currentPage = ref((Number(route.query.page) as number) || 1);
const pagesCount = computed(() =>
  products.value?.meta?.filter_count
    ? Math.ceil(products.value?.meta?.filter_count / settings.limit)
    : 0,
);
const productsRef = useTemplateRef("productsRef");
watch(currentPage, (newValue) => {
  if (newValue) {
    navigateTo({ query: { ...route.query, page: newValue } });
    productsRef.value?.scrollIntoView();
  }
});
watch(
  () => route.query.page,
  (newValue) => {
    if (newValue) {
      currentPage.value = Number(newValue);
    }
  },
  { immediate: true },
);

const { data: products } = useQuery({
  key: () => [
    "product-list",
    { limit: limit, label: settings.label, page: currentPage.value },
  ],
  query: async () =>
    await productStore.getAllProducts(
      CollectionType.PRODUCTS,
      "*",
      limit,
      filter.value,
      currentPage.value,
    ),
  placeholderData: (previousData) => previousData,
});

const columnClass = () =>
  columns === 2 ? "two-column" : columns === 3 ? "three-column" : null;

defineExpose({
  productCarousel,
});
</script>

<template>
  <section v-if="products?.data" ref="productsRef" class="product-list">
    <div class="product-list__products">
      <EmptyDataHeading v-if="!products.data.length" />
      <div v-if="is_carousel" class="product-list__products__carousel">
        <div class="product-list__products__cards">
          <Carousel v-bind="carouselConfig" ref="productCarousel">
            <Slide v-for="product in products.data" :key="product.id">
              <ProductCard v-bind="product" />
            </Slide>
            <template #addons>
              <CarouselPagination />
            </template>
          </Carousel>
        </div>
      </div>
      <div v-else class="product-list__products__grid">
        <div class="product-list__products__cards">
          <div
            :class="['product-list__products__cards__wrapper', columnClass()]"
          >
            <ProductCard
              v-for="product in products.data"
              :key="product.id"
              v-bind="product"
            />
          </div>
        </div>
      </div>
    </div>
    <Pagination
      v-if="settings.paginatable && products.data.length"
      v-model="currentPage"
      :pages-count="pagesCount"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
