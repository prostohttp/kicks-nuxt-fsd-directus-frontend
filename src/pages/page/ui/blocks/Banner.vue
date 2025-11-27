<script setup lang="ts">
import { CollectionType, getBanner } from "~/src/shared/api";
import { Banner } from "~/src/shared/ui/Banner";
import { Preloader } from "~/src/shared/ui/preloader";

const { itemId } = defineProps<{ itemId: string }>();
const { data, isLoading } = useQuery({
  key: () => ["banners", itemId],
  query: async () => await getBanner(itemId, CollectionType.BLOCKS_BANNER),
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <Banner v-else-if="data" v-bind="data.banner" />
</template>
