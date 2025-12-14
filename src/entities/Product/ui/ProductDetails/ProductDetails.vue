<script setup lang="ts">
import { FullScreenGallery } from "~/src/shared/ui/modal";
import type { ProductDetailsType } from "../../model/types";
import { formatUSD } from "~/src/shared/lib";
import { Gallery } from "~/src/shared/ui/Gallery";

const { description, gallery, image, label, title, price, option_values } =
  defineProps<ProductDetailsType>();

const isOpen = ref(false);

watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});
const images = computed(() => [
  image,
  ...gallery.map((image) => image.directus_files_id),
]);

const imagesGrid = computed(() => images.value.slice(0, 4));

const descriptionRef = useTemplateRef("description");

const isShowMoreLabel = computed(() => {
  if (descriptionRef.value) {
    return descriptionRef.value.offsetHeight > 500 ? true : false;
  } else {
    return false;
  }
});

const fullDescription = ref(false);
const showMoreText = computed(() =>
  fullDescription.value ? "Show less" : "Show more",
);
</script>

<template>
  <section class="product-details">
    <div class="left">
      <div
        v-if="gallery.length"
        class="product-details__desktop-gallery product-details__desktop-gallery--many"
      >
        <div
          v-for="(item, index) in imagesGrid"
          :key="index"
          class="product-details__desktop-gallery--many__image"
          @click="isOpen = !isOpen"
        >
          <NuxtImg
            provider="directus"
            loading="lazy"
            format="webp"
            :width="430"
            :src="item"
          />
        </div>
      </div>
      <div class="product-details__mobile-gallery">
        <Gallery :images />
      </div>
      <div
        v-if="!gallery.length"
        class="product-details__desktop-gallery product-details__desktop-gallery--one"
        @click="isOpen = !isOpen"
      >
        <NuxtImg
          provider="directus"
          loading="lazy"
          format="webp"
          :width="867"
          :src="image"
        />
      </div>
    </div>
    <div class="right">
      <span v-if="label" class="product-details__label">
        {{ label }}
      </span>
      <h1 class="product-details__heading">
        {{ title }}
      </h1>
      <strong class="product-details__price">
        {{ formatUSD(price) }}
      </strong>
      <div v-if="option_values" class="product-details__options">
        <!-- {{ option_values }} -->
      </div>
      <slot name="options" />
      <slot name="actions" />
      <div
        v-if="description"
        v-gsap.onState-visible.to="{
          height: 'auto',
          'max-height': 'max-content',
          y: 0,
          duration: 0.25,
        }"
        class="product-details__description"
        :class="{ 'product-details__description--full': fullDescription }"
        :style="{
          background:
            isShowMoreLabel && !fullDescription
              ? 'linear-gradient(180deg, #e7e7e3 22%, rgb(228 225 225) 60%)'
              : '',
        }"
        :data-visible="fullDescription"
      >
        <h3 class="product-details__description__title">About the product</h3>
        <div
          ref="description"
          class="product-details__description__content"
          v-html="description"
        ></div>
        <div
          v-if="isShowMoreLabel"
          class="show-more"
          @click="fullDescription = !fullDescription"
        >
          {{ showMoreText }}
        </div>
      </div>
    </div>
    <Teleport to="#teleports">
      <FullScreenGallery v-model="isOpen" :images />
    </Teleport>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
