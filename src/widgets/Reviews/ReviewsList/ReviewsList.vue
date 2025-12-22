<script setup lang="ts">
import { CollectionType } from "~/src/shared/api";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { getReviews, ReviewCard } from "~/src/entities/Review";
import { Preloader } from "~/src/shared/ui/preloader";

const { limit, sort } = defineProps<{
  limit?: number;
  sort?: string;
}>();

const { data: reviews, isLoading } = useQuery({
  key: () => ["reviews", limit ? limit : ""],
  query: async () => await getReviews(CollectionType.REVIEWS, limit, sort),
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="reviews-list">
    <div v-if="reviews?.length" class="reviews-list__cards">
      <ReviewCard v-for="review in reviews" v-bind="review" :key="review.id" />
    </div>
    <EmptyDataHeading v-else />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
