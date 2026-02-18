<script setup lang="ts">
import { getPage } from "../api";
import { Preloader } from "~/src/shared/ui/preloader";
import { pageBlocksMapper } from "../api/blocksMapper";

const route = useRoute();

// TODO: Вынести в composables, если необходимо
const pageSlug = computed(() =>
  "page" in route.params
    ? (route.params.page as string)
    : route.path === "/"
      ? route.path
      : null,
);
const { data: page, isLoading } = useQuery({
  key: () => ["pages", { page: pageSlug.value }],
  query: async () => {
    const page = await getPage(pageSlug.value);
    if (!page) {
      throw createError({
        status: 404,
        message: "Page not found",
      });
    }
    return page;
  },
});
useSeoMeta({
  title: () => page.value?.seo_data.title,
  description: () => page.value?.seo_data.meta_description,
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else-if="page" class="page-page">
    <component
      :is="pageBlocksMapper[block.collection]"
      v-for="block in page.blocks"
      :key="block.id"
      :item-id="block.item"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
