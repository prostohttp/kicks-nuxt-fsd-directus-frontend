<script setup lang="ts">
import { CollectionType, getBanner } from "~/src/shared/api";
import { Banner } from "~/src/shared/ui/Banner";

const { itemId } = defineProps<{ itemId: string }>();
const { data: banner } = useQuery({
  key: () => ["banners", itemId],
  query: async () => await getBanner(itemId, CollectionType.BLOCKS_BANNER),
});
</script>

<template>
  <Banner v-if="banner" v-bind="banner" />
</template>
