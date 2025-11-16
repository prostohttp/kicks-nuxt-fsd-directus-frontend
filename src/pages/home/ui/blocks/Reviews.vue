<script setup lang="ts">
import { getBlockReviews } from "~/src/shared/api";
import { ReviewsList } from "~/src/widgets/Reviews/ReviewsList";

const { itemId } = defineProps<{ itemId: string }>();
const { data } = useQuery({
  key: ["home-reviews-carousel-block"],
  query: async () => await getBlockReviews(itemId),
});
</script>

<template>
  <ReviewsList v-if="data" :settings="data" />
</template>
