<script setup lang="ts">
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { Preloader } from "../preloader";

const { images } = defineProps<{ images: string[] }>();

const currentSlide = ref(0);

const slideTo = (nextSlide: number) => (currentSlide.value = nextSlide);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: "fade",
  mouseDrag: false,
  touchDrag: false,
  height: 270,
} as const;

const thumbnailsConfig = {
  height: 64,
  itemsToShow: 5,
  mouseDrag: false,
  touchDrag: false,
  gap: 0
};
</script>

<template>
  <section class="gallery">
    <Carousel
      v-bind="galleryConfig"
      v-model="currentSlide"
      class="gallery__main"
    >
      <Slide v-for="image in images" :key="image">
        <NuxtImg
          provider="directus"
          format="webp"
          :height="270"
          :src="image"
          alt="main image"
          class="gallery__main__image"
        />
      </Slide>
    </Carousel>

    <ClientOnly v-if="images.length !==1">
      <template #fallback>
        <Preloader />
      </template>
      <Carousel
        v-model="currentSlide"
        class="gallery__thumbnails"
        v-bind="thumbnailsConfig"
      >
        <Slide v-for="image in images" :key="image">
          <template #default="{ currentIndex, isActive }">
            <div
              :class="[
                'gallery__thumbnails__thumbnail',
                { 'is-active': isActive },
              ]"
              @click="slideTo(currentIndex)"
            >
              <NuxtImg
                provider="directus"
                :height="64"
                :src="image"
                alt="thumbnail"
                class="gallery__thumbnails__thumbnail__image"
              />
            </div>
          </template>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </ClientOnly>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
