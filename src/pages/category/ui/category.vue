<script setup lang="ts">
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { getCategory } from "../api";
import { NotFound } from "~/src/shared/ui/NotFound";
import { Banner } from "~/src/shared/ui/Banner";
import { HeadingWith, SmallHeading } from "~/src/shared/ui/heading";
import { ProductList } from "~/src/widgets/Product/ProductList";
import { Preloader } from "~/src/shared/ui/preloader";
import { useProductStore } from "~/src/entities/Product";
import { Filter } from "~/src/widgets/Filter";
import { SortProducts } from "~/src/features/sort";

const route = useRoute();
const categorySlug = computed(() =>
  "category" in route.params ? (route.params.category as string) : null,
);
const { data, isLoading } = useQuery({
  key: () => ["category", categorySlug.value],
  query: async () =>
    await getCategory(CollectionType.CATEGORIES, categorySlug.value),
});
const category = computed(() => (data.value ? data.value[0] : null));

useSeoMeta({
  title: () => category.value?.seo.title,
  description: () => category.value?.seo.meta_description,
});

const settings = computed<BlockProductType>(() => ({
  limit: data.value && data.value[0]?.show_filter ? 9 : 8,
  collection: CollectionType.PRODUCTS,
  columns: data.value && data.value[0]?.show_filter ? 3 : 4,
  paginatable: true,
}));

const filter = computed(() => ({
  categories: {
    product_categories_id: { _in: data.value ? data.value[0]?.id : undefined },
  },
}));

const headingRef = useTemplateRef("headingRef");
const scrollToProductsRef = () => headingRef.value?.scrollIntoView();

const productStore = useProductStore();
const filterProducts = computed(
  () => productStore.products?.meta?.filter_count,
);
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else-if="category && data && data[0]" class="category-page">
    <Banner
      v-if="data[0].banner"
      v-bind="data[0].banner"
      class="category-page__banner"
    />
    <div ref="headingRef" class="category-page__heading">
      <HeadingWith style="align-items: flex-start">
        <template #left>
          <SmallHeading :heading="data[0].title" />
          <ClientOnly>
            <div class="category-page__heading__total">
              {{ filterProducts }} items
            </div>
          </ClientOnly>
        </template>
        <template #right>
          <SortProducts />
        </template>
      </HeadingWith>
    </div>
    <div v-if="data[0].show_filter" class="category-page__content-with-filters">
      <div class="category-page__content-with-filters__filters">
        <h4 class="category-page__content-with-filters__filters__title">
          Filters
        </h4>
        <Filter />
      </div>
      <div class="category-page__content-with-filters__products">
        <ProductList :filter :settings @scroll-into="scrollToProductsRef" />
      </div>
    </div>
    <div v-else class="category-page__content">
      <div class="category-page__content__products">
        <ProductList :filter :settings @scroll-into="scrollToProductsRef" />
      </div>
    </div>
  </section>
  <NotFound v-else heading="Category not found!" />
</template>

<style lang="scss">
@use "styles";
</style>
