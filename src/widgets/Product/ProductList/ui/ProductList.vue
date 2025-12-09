<script setup lang="ts">
import {
  Pagination as CarouselPagination,
  Carousel,
} from "vue3-carousel/dist/carousel";
import { ProductCard, useProductStore } from "~/src/entities/Product";
import { useSortStore } from "~/src/features/sort";
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { Pagination } from "~/src/shared/ui/Pagination";
import { makeQueryFilter } from "../model/helpers";

const { settings, optionValues } = defineProps<{
  settings: BlockProductType;
  optionValues?: string[];
}>();
const emit = defineEmits<{
  scrollInto: [];
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

const route = useRoute();
const currentPage = ref((Number(route.query.page) as number) || 1);
const pagesCount = computed(() =>
  products.value?.meta?.filter_count
    ? Math.ceil(products.value?.meta?.filter_count / settings.limit)
    : 0,
);

watch(currentPage, (newValue) => {
  if (newValue) {
    navigateTo({ query: { ...route.query, page: newValue } });
    emit("scrollInto");
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

const productStore = useProductStore();
const sortStore = useSortStore();

const filter = ref(makeQueryFilter(settings, optionValues));

const { data: products, isLoading } = useQuery({
  key: () => [
    "product-list",
    {
      limit: settings.limit,
      page: currentPage.value,
      sort: sortStore.sortSafety,
      filter: filter.value,
    },
  ],
  query: async () => {
    const products = await productStore.getAllProducts(
      CollectionType.PRODUCTS,
      "*",
      settings.limit,
      filter.value,
      currentPage.value,
      sortStore.sortSafety,
    );
    productStore.setProducts(products);
    return products;
  },
  placeholderData: (previousData) => previousData,
});

const columnClass = computed(() =>
  settings.columns === 2
    ? "two-column"
    : settings.columns === 3
      ? "three-column"
      : null,
);

const isPagination = computed(
  () =>
    products.value &&
    settings.paginatable &&
    products.value.meta &&
    products.value.meta.filter_count &&
    products.value.meta.filter_count > settings.limit,
);

const refresh = () => {
  filter.value = makeQueryFilter(settings, optionValues);
};

defineExpose({
  productCarousel,
  refresh,
});
</script>

<template>
  <section v-if="products" class="product-list">
    <div
      class="product-list__products"
      :class="{ 'product-list__products-loading': isLoading }"
    >
      <EmptyDataHeading v-if="!products.data.length" />
      <div v-if="settings.is_carousel" class="product-list__products__carousel">
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
          <div :class="['product-list__products__cards__wrapper', columnClass]">
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
      v-if="isPagination"
      v-model="currentPage"
      :pages-count="pagesCount"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
