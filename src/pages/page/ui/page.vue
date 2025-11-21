<script setup lang="ts">
import { CollectionType } from "~/src/shared/api";
import { getPage } from "../api";
import { Preloader } from "~/src/shared/ui/preloader";
import { NotFound } from "~/src/shared/ui/NotFound";

const notFoundMessage = "Page not found!";
const route = useRoute();
const pageSlug = computed(() =>
  "page" in route.params ? (route.params.page as string) : null,
);
const { data, isLoading } = useQuery({
  key: () => ["pages", pageSlug.value],
  query: async () => getPage(CollectionType.PAGES, pageSlug.value),
});
const page = computed(() => (data.value ? data.value[0] : null));
useSeoMeta({
  title: () => page.value?.seo_data.title,
  description: () => page.value?.seo_data.meta_description,
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <NotFound v-else-if="!page" :heading="notFoundMessage" />
  <section v-else class="page-page">
    <pre>{{ page }}</pre>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
