<script setup lang="ts">
import { CollectionType, type BlockReviewsType } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/Button";
import {
  EmptyDataHeading,
  HeadingWith,
  LargeHeading,
} from "~/src/shared/ui/heading";
import { getReviews, ReviewCard } from "~/src/entities/Review";
import { Preloader } from "~/src/shared/ui/preloader";

const { settings } = defineProps<{
  settings: BlockReviewsType;
}>();

const { data: reviews, isLoading } = useQuery({
  key: () => ["home-reviews-list", settings.limit ? settings.limit : ""],
  query: async () => await getReviews(CollectionType.REVIEWS, settings.limit),
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="reviews-list">
    <HeadingWith v-if="settings">
      <template #heading>
        <LargeHeading v-if="settings.heading" :heading="settings.heading" />
      </template>
      <template #button>
        <NuxtLink v-if="settings.button_url" :to="settings.button_url">
          <Button
            variant="fill"
            size="large"
            style="background-color: #416aea; justify-content: center"
          >
            {{ settings.button_text }}
          </Button>
        </NuxtLink>
      </template>
    </HeadingWith>
    <div v-if="reviews?.length" class="reviews-list__cards">
      <ReviewCard v-for="review in reviews" v-bind="review" :key="review.id" />
    </div>
    <EmptyDataHeading v-else />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
