<script setup lang="ts">
import { CollectionType, type BlockProductType } from "~/src/shared/api";
import { getCategory } from "../api";
import { NotFound } from "~/src/shared/ui/NotFound";
import { Banner } from "~/src/shared/ui/Banner";
import { Select, type SelectItemType } from "~/src/shared/ui/form";
import { HeadingWith, SmallHeading } from "~/src/shared/ui/heading";
import { ProductList } from "~/src/widgets/Product/ProductList";

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
const sortList: SelectItemType[] = reactive([
  {
    label: "Default",
    value: "",
  },
  {
    label: "Price up",
    value: "price",
  },
  {
    label: "Price down",
    value: "-price",
  },
  {
    label: "Newest",
    value: "-date_created",
  },
  {
    label: "Latest",
    value: "date_created",
  },
]);
const initialSortValue = () => {
  const sortQuery = route.query.sort;
  if (sortQuery) {
    const sortListItem = sortList.find((item) => item.value === sortQuery);
    return sortListItem?.label || "Default";
  } else {
    return "Default";
  }
};
const sortValue = ref(initialSortValue());
const sortQuery = computed(() => {
  const sort = sortList.find((item) => item.label === sortValue.value);
  return sort?.value || "";
});

watch(sortValue, (newValue) => {
  if (newValue) {
    navigateTo({
      query: {
        ...route.query,
        sort: sortQuery.value,
      },
    });
  }
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
</script>

<template>
  <NotFound v-if="!isLoading && !category" heading="Category not found!" />
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
        </template>
        <template #right>
          <Select v-model="sortValue" :list="sortList" />
        </template>
      </HeadingWith>
    </div>
    <div v-if="data[0].show_filter" class="category-page__content-with-filters">
      <div class="category-page__content-with-filters__filters">filters</div>
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
</template>

<style lang="scss">
@use "styles";
</style>
