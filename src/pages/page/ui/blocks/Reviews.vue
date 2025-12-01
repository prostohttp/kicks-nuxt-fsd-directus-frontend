<script setup lang="ts">
import { getBlockReviews } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/form";
import { HeadingWith, LargeHeading } from "~/src/shared/ui/heading";
import { ReviewsList } from "~/src/widgets/Reviews/ReviewsList";

const { itemId } = defineProps<{ itemId: string }>();
const { data } = useQuery({
  key: () => ["reviews", itemId],
  query: async () => await getBlockReviews(itemId),
});
</script>

<template>
  <section class="reviews-block">
    <HeadingWith v-if="data?.heading">
      <template #left>
        <LargeHeading :heading="data.heading" />
      </template>
      <template #right>
        <NuxtLink v-if="data.button_url" :to="data.button_url">
          <Button
            variant="fill"
            size="large"
            style="background-color: #416aea; justify-content: center"
          >
            {{ data.button_text }}
          </Button>
        </NuxtLink>
      </template>
    </HeadingWith>
  </section>
  <ReviewsList v-if="data" :limit="data.limit" :column="data.columns" />
</template>

<style lang="scss">
.reviews-block {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 80px;

  @media (max-width: 991px) {
    margin-top: 30px;
    gap: 10px;
  }
}
</style>
