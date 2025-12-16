<script setup lang="ts">
import type { ImageType, ReviewType } from "~/src/shared/api";
import { FullScreenModal } from "~/src/shared/ui/modal";
import { StarRating } from "~/src/shared/ui/StarRating";

const { reviews } = defineProps<{
  reviews: ReviewType[];
}>();

const isOpenForm = ref(false);
const isOpenPreview = ref(false);
const previewGallery = ref<ImageType[]>([]);
const openPreviewHandler = (gallery: ImageType[]) => {
  isOpenPreview.value = !isOpenPreview.value;
  previewGallery.value = gallery;
};
</script>

<template>
  <section class="product-reviews">
    <div v-if="isOpenForm" class="product-reviews__form">add review</div>
    <template v-if="reviews.length">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="product-reviews__review"
      >
        <div class="product-reviews__review__head">
          <div class="product-reviews__review__head__left">
            <h3>{{ review.title }}</h3>
            <StarRating v-model="review.rating" />
          </div>
          <div class="product-reviews__review__head__right">
            <NuxtImg
              provider="directus"
              :src="review.user_created.avatar"
              :width="64"
            />
          </div>
        </div>
        <div class="product-reviews__review__text">
          <p>{{ review.review }}</p>
        </div>
        <div class="product-reviews__review__gallery">
          <template v-if="review.gallery.length">
            <div
              v-for="{ directus_files_id } in review.gallery"
              :key="directus_files_id"
              class="product-reviews__review__gallery__image"
              @click="openPreviewHandler(review.gallery)"
            >
              <NuxtImg provider="directus" :src="directus_files_id" />
            </div>
          </template>
        </div>
      </div>
    </template>
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
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
