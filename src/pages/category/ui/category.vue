<script setup lang="ts">
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { Banner } from "~/src/shared/ui/Banner";
import { HeadingWith, SmallHeading } from "~/src/shared/ui/heading";
import { ProductList } from "~/src/widgets/Product/ProductList";
import { useProductStore } from "~/src/entities/Product";
import { SortProducts } from "~/src/features/sort";
import { Placeholder } from "~/src/shared/ui/Placeholder";
import { Preloader } from "~/src/shared/ui/preloader";
import { IconCloseFlat, IconFilter } from "~/src/shared/ui/icons";
import { Filters } from "./Filter";
import { useCategoryStore } from "../model/stores/category";

const route = useRoute();

const categorySlug = computed(() =>
  "category" in route.params ? (route.params.category as string) : null,
);

const categoryStore = useCategoryStore();

const { data: category, isLoading } = useQuery({
  key: () => ["category", categorySlug.value],
  query: async () => {
    const category = await categoryStore.getCategory(categorySlug.value);
    if (!category) {
      throw createError({
        status: 404,
        message: "Category not found",
      });
    }
    return category;
  },
});

useSeoMeta({
  title: () => category.value && category.value.seo.title,
  description: () => category.value && category.value.seo.meta_description,
});

const settings = computed<BlockProductType>(() => ({
  id: category.value?.id,
  limit: category.value && category.value.show_filter ? 9 : 8,
  collection: CollectionType.PRODUCTS,
  columns: category.value && category.value.show_filter ? 3 : 4,
  paginatable: true,
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

const exposeRef = ref();

const applyFilters = () => {
  navigateTo({
    query: { ...route.query, page: 1 },
  });
  exposeRef.value.refresh();
  isActiveFilter.value = false;
  scrollToProductsRef();
};

const resetFilters = () => {
  navigateTo({
    query: {},
  });
  setTimeout(() => exposeRef.value.refresh(), 200);
  isActiveFilter.value = false;
  scrollToProductsRef();
};

const optionValues = computed(() =>
  category.value?.show_filter
    ? category.value.show_filter.options.map(
        (option) => option.options_id.for_filter,
      )
    : undefined,
);
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else-if="!isLoading && category" class="category-page">
    <Banner
      v-if="category.banner"
      v-bind="category.banner"
      class="category-page__banner"
    />
    <div ref="headingRef" class="category-page__heading">
      <HeadingWith style="align-items: flex-start">
        <template #left>
          <div class="category-heading">
            <SmallHeading :heading="category.title" />
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
        <SmallHeading :heading="category.title" />
        <ClientOnly>
          <template #fallback>
            <Placeholder h="24px" w="100px" m="5px 0 0" />
          </template>
          <div class="category-heading__total">{{ filterProducts }} items</div>
        </ClientOnly>
      </div>
    </div>
    <div
      v-if="category.show_filter"
      class="category-page__content-with-filters"
    >
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
            :filters="category.show_filter.options"
            :category-id="category.id"
            class="sticky-desktop-filters"
            @apply="applyFilters"
            @reset="resetFilters"
          />
        </ClientOnly>
      </div>
      <div class="category-page__content-with-filters__products">
        <ProductList
          ref="exposeRef"
          :option-values="optionValues"
          :settings
          @scroll-into="scrollToProductsRef"
        />
      </div>
    </div>
    <div v-else class="category-page__content">
      <div class="category-page__content__products">
        <ProductList
          ref="exposeRef"
          :option-values="optionValues"
          :settings
          @scroll-into="scrollToProductsRef"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
