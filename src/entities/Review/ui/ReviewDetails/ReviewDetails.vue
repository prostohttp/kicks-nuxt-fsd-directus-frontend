<script setup lang="ts">
import { UserAvatar } from "~/src/entities/User/@x/Review";
import type { ImageType, ReviewType } from "~/src/shared/api";
import { FullScreenModal } from "~/src/shared/ui/modal";
import { StarRating } from "~/src/shared/ui/StarRating";

const { review } = defineProps<{
  review: ReviewType;
}>();

const rating = ref(review.rating);
const isOpenPreview = ref(false);
const previewGallery = ref<ImageType[]>([]);

const openPreviewHandler = (gallery: ImageType[]) => {
  isOpenPreview.value = !isOpenPreview.value;
  previewGallery.value = gallery;
};
</script>

<template>
  <section class="review-details">
    <div class="review-details__head">
      <div class="review-details__head__left">
        <h3>{{ review.title }}</h3>
        <StarRating v-model="rating" />
      </div>
      <UserAvatar :avatar="review.user_created.avatar" />
    </div>
    <div class="review-details__text">
      <p>{{ review.review }}</p>
    </div>
    <div class="review-details__gallery">
      <template v-if="review.gallery.length">
        <div
          v-for="{ directus_files_id } in review.gallery"
          :key="directus_files_id"
          class="review-details__gallery__image"
          @click="openPreviewHandler(review.gallery)"
        >
          <NuxtImg provider="directus" :src="directus_files_id" />
        </div>
      </template>
    </div>
  </section>
  <Teleport to="#teleports">
    <FullScreenModal v-model="isOpenPreview">
      <div
        v-for="{ directus_files_id } in previewGallery"
        :key="directus_files_id"
        class="full-screen-modal-gallery-image"
      >
        <NuxtImg
          provider="directus"
          format="webp"
          :src="directus_files_id"
          @click="isOpenPreview = !isOpenPreview"
        />
      </div>
    </FullScreenModal>
  </Teleport>
</template>

<style lang="scss">
@use "styles";
</style>
