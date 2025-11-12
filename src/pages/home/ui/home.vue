<script setup lang="ts">
import { getPageBlocksAndSeo } from "~/src/shared/api";
import { homeBlocksMapper } from "../api/blocksMapper";

const { data } = useQuery({
  key: ["home-blocks-and-seo"],
  query: async () => await getPageBlocksAndSeo("3"),
});
useSeoMeta({
  title: data.value?.seo_data.title,
  description: data.value?.seo_data.meta_description,
});
</script>

<template>
  <main class="home-page">
    <!-- <pre>{{ data?.blocks }}</pre> -->
    <component
      :is="homeBlocksMapper[block.id]"
      v-for="(block, index) in data?.blocks"
      :key="index"
      :item-id="block.item"
    />
  </main>
</template>
