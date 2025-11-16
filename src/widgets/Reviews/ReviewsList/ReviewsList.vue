<script setup lang="ts">
import { CollectionType, type BlockReviewsType } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/Button";
import { HeadingWith, LargeHeading } from "~/src/shared/ui/heading";
import { getReviews, ReviewCard } from "~/src/entities/Review";

const { settings } = defineProps<{
  settings: BlockReviewsType;
}>();

const { data: reviews } = useQuery({
  key: ["home-reviews-list"],
  query: async () => await getReviews(CollectionType.REVIEWS, settings.limit),
});
</script>

<template>
  <section class="reviews-list">
    <HeadingWith v-if="settings">
      <template #heading>
        <LargeHeading v-if="settings.heading" :heading="settings.heading" />
      </template>
      <template #button>
        <NuxtLink v-if="settings.button_url" :to="settings.button_url">
          <Button variant="fill" size="large" style="background-color: #416aea">
            {{ settings.button_text }}
          </Button>
        </NuxtLink>
      </template>
    </HeadingWith>
    <div class="reviews-list__cards">
      <ReviewCard v-for="review in reviews" v-bind="review" :key="review.id" />
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
