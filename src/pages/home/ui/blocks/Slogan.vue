<script setup lang="ts">
import { CollectionType, getBanner } from "~/src/shared/api";
import { Banner, type BannerType } from "~/src/shared/ui/Banner";

const { itemId } = defineProps<{ itemId: string }>();
const { data } = useQuery({
  key: ["home-slogan-block"],
  query: async () =>
    (await getBanner(itemId, CollectionType.BLOCKS_BANNER)) as {
      banner: BannerType;
    },
});
</script>

<template>
  <Banner v-if="data?.banner" :image="data.banner.image" />
</template>
