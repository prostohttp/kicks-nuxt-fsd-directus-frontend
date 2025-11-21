<script setup lang="ts">
import { CollectionType } from "~/src/shared/api";
import { getCategory } from "../api";
import { Preloader } from "~/src/shared/ui/preloader";
import { NotFound } from "~/src/shared/ui/NotFound";

const route = useRoute();
const categorySlug = computed(() =>
  "category" in route.params ? (route.params.category as string) : null,
);
const { data, isLoading } = useQuery({
  key: () => ["category", categorySlug.value],
  query: async () => getCategory(CollectionType.CATEGORIES, categorySlug.value),
});
const category = computed(() => (data.value ? data.value[0] : null));
useSeoMeta({
  title: () => category.value?.seo.title,
  description: () => category.value?.seo.meta_description,
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <NotFound v-else-if="!category" heading="Category not found!" />
  <section v-else class="category-page">
    <pre>{{ category }}</pre>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
