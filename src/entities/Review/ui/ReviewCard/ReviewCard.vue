<script setup lang="ts">
import { StarRating } from "~/src/shared/ui/StarRating";
import { ROUTES } from "~/src/shared/routes";
import type { ReviewType } from "~/src/shared/api";
import { truncateText } from "../../model/helpers";

const { gallery, product, rating, review, title, user_created } =
  defineProps<ReviewType>();

const ratingModel = ref(rating);
</script>

<template>
  <section class="review-card">
    <div class="review-card__header">
      <div class="review-card__header__info">
        <h3>
          <NuxtLink :to="ROUTES.product(product.slug)">
            {{ title }}
          </NuxtLink>
        </h3>
        <p>
          <NuxtLink :to="ROUTES.product(product.slug)">
            {{ truncateText(review, 100) }}
          </NuxtLink>
        </p>
        <StarRating v-model="ratingModel" />
      </div>
      <div class="review-card__header__avatar">
        <NuxtImg
          provider="directus"
          loading="lazy"
          format="webp"
          :src="user_created.avatar"
        />
      </div>
    </div>
    <div class="review-card__image">
      <NuxtImg
        v-if="gallery[0]?.directus_files_id"
        provider="directus"
        format="webp"
        :src="gallery[0].directus_files_id"
      />
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
