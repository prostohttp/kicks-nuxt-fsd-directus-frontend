<script setup lang="ts">
import { Button } from "../Button";
import { Placeholder } from "../Placeholder";
import type { SliderType } from "./types";

const { slider, isLoading } = defineProps<{
  slider: SliderType;
  isLoading: boolean;
}>();
const { banners } = slider;

const activeSlide = ref(banners[0]?.id);
const changeActiveSlide = (slide: string) => (activeSlide.value = slide);
const { getThumbnail: img } = useDirectusFiles();
</script>

<template>
  <section class="slider">
    <!-- TODO: Первичная загрузка -->
    <Placeholder v-if="isLoading" />
    <template v-else>
      <div class="slider__thumbs">
        <div
          v-for="(thumb, index) in banners"
          :key="thumb.id"
          v-gsap.from="{
            opacity: 0,
            yPercent: -100,
            delay: 0.1 * (index + 1),
            duration: 0.16,
          }"
          class="slider__thumb"
        >
          <NuxtImg
            v-if="thumb.preview_image"
            :src="img(thumb.preview_image)"
            alt="thumb"
            :class="{ active: activeSlide === thumb.id }"
            @click="changeActiveSlide(thumb.id)"
          />
        </div>
      </div>
      <div
        v-for="banner in banners"
        :key="banner.id"
        v-gsap.onState-visible.fromTo="[
          {
            scale: 1.5,
            opacity: 0.5,
            duration: 0.2,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.2,
          },
        ]"
        class="slide"
        :data-visible="activeSlide === banner.id"
      >
        <div v-if="banner.slide_label" class="slide__label">
          <NuxtImg
            v-gsap.onState-change.from="{
              opacity: 0,
              scale: 2,
              duration: 0.2,
              delay: 0.8,
            }"
            :src="img(banner.slide_label)"
            :data-change="activeSlide === banner.id"
            alt="label"
          />
        </div>
        <NuxtImg
          v-gsap.from="{
            opacity: 0,
            scale: 1.4,
            duration: 0.16,
          }"
          :src="
            img(banner.image, {
              format: 'webp',
            })
          "
          :alt="banner.heading"
          class="slide__image"
        />
        <div class="slide__content">
          <div class="slide__content__info">
            <h2
              v-if="banner.heading"
              v-gsap.onState-change.from="{
                opacity: 0,
                xPercent: -100,
                delay: 0.5,
                duration: 0.2,
              }"
              class="slide__content__info__title"
              :data-change="activeSlide === banner.id"
            >
              {{ banner.heading }}
            </h2>
            <p
              v-if="banner.description"
              v-gsap.onState-change.from="{
                opacity: 0,
                xPercent: -100,
                delay: 0.6,
                duration: 0.18,
              }"
              :data-change="activeSlide === banner.id"
              class="slide__content__info__description"
            >
              {{ banner.description }}
            </p>
            <div
              v-gsap.onState-change.from="{
                opacity: 0,
                xPercent: -100,
                delay: 0.7,
                duration: 0.15,
              }"
              :data-change="activeSlide === banner.id"
              class="slide__content__info__button"
            >
              <NuxtLink v-if="banner.button_url" :to="banner.button_url">
                <Button
                  variant="fill"
                  size="large"
                  style="background-color: #4a69e2"
                >
                  {{ banner.button_text }}
                </Button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
