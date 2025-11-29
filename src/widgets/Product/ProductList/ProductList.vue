<script setup lang="ts">
import {
  Pagination as CarouselPagination,
  Carousel,
} from "vue3-carousel/dist/carousel";
import { ProductCard, useProductStore } from "~/src/entities/Product";
import {
  CollectionType,
  type ApiFilterType,
  type BlockProductType,
} from "~/src/shared/api";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { Pagination } from "~/src/shared/ui/Pagination";

const { settings, filter } = defineProps<{
  settings: BlockProductType;
  filter?: ApiFilterType;
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

const productStore = useProductStore();

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

const { data: products, isLoading } = useQuery({
  key: () => [
    "product-list",
    {
      limit: settings.limit,
      label: settings.label,
      page: currentPage.value,
      sort: route.query.sort as string,
      filter: filter,
    },
  ],
  query: async () =>
    await productStore.getAllProducts(
      CollectionType.PRODUCTS,
      "*",
      settings.limit,
      filter,
      currentPage.value,
      route.query.sort?.toString(),
    ),
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

defineExpose({
  productCarousel,
});
</script>

<template>
  <section v-if="products?.data" class="product-list">
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
      style="margin-top: 50px;"
      :pages-count="pagesCount"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
