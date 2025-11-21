<script setup lang="ts">
import { CollectionType, getBanner } from "~/src/shared/api";
import { Banner, type BannerType } from "~/src/shared/ui/Banner";
import { Preloader } from "~/src/shared/ui/preloader";

const { itemId } = defineProps<{ itemId: string }>();
const { data, isLoading } = useQuery({
  key: ["home-slogan-block"],
  query: async () =>
    (await getBanner(itemId, CollectionType.BLOCKS_BANNER)) as {
      banner: BannerType;
    },
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <Banner
    v-else-if="!isLoading && data?.banner"
    :image="data.banner.image"
    style="padding-top: 30px"
  />
</template>
