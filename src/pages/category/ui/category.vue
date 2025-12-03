<script setup lang="ts">
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { getCategory } from "../api";
import { NotFound } from "~/src/shared/ui/NotFound";
import { Banner } from "~/src/shared/ui/Banner";
import { HeadingWith, SmallHeading } from "~/src/shared/ui/heading";
import { ProductList } from "~/src/widgets/Product/ProductList";
import { Preloader } from "~/src/shared/ui/preloader";
import { useProductStore } from "~/src/entities/Product";
import { Filters } from "~/src/widgets/Filter";
import { SortProducts } from "~/src/features/sort";
import { Placeholder } from "~/src/shared/ui/Placeholder";
import { IconCloseFlat, IconFilter } from "~/src/shared/ui/icons";

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

const isActiveFilter = ref(false);

watch(isActiveFilter, (newValue) => {
  if (newValue) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});
const applyFilters = () => {
  isActiveFilter.value = false;
};
const resetFilters = () => {
  isActiveFilter.value = false;
  navigateTo({
    query: {},
  });
};
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
          <div class="category-heading">
            <SmallHeading :heading="data[0].title" />
            <ClientOnly>
              <template #fallback>
                <Placeholder h="24px" w="100px" m="5px 0 0" />
              </template>
              <div class="category-heading__total">
                {{ filterProducts }} items
              </div>
            </ClientOnly>
          </div>
          <button
            class="category-page__heading__filter-button"
            @click="isActiveFilter = true"
          >
            <span>Filters</span>
            <IconFilter />
          </button>
        </template>
        <template #right>
          <SortProducts />
        </template>
      </HeadingWith>

      <div class="category-heading-mobile">
        <SmallHeading :heading="data[0].title" />
        <ClientOnly>
          <template #fallback>
            <Placeholder h="24px" w="100px" m="5px 0 0" />
          </template>
          <div class="category-heading__total">{{ filterProducts }} items</div>
        </ClientOnly>
      </div>
    </div>
    <div v-if="data[0].show_filter" class="category-page__content-with-filters">
      <div
        class="category-page__content-with-filters__filters"
        :class="{
          'category-page__content-with-filters__filters-active': isActiveFilter,
        }"
      >
        <h4 class="category-page__content-with-filters__filters__title">
          <span>Filters</span>
          <IconCloseFlat
            class="category-page__content-with-filters__filters-active__close"
            @click="isActiveFilter = false"
          />
        </h4>
        <ClientOnly>
          <template #fallback>
            <Placeholder h="60px" m="5px 0 0 " />
          </template>
          <Filters
            :filters="data[0].show_filter.options"
            class="sticky-desktop-filters"
            @apply="applyFilters"
            @reset="resetFilters"
          />
        </ClientOnly>
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
