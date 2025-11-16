<script setup lang="ts">
import type { BlockCategoryType } from "~/src/shared/api";
import { getCategories } from "./api";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import { HeadingWith, LargeHeading } from "~/src/shared/ui/heading";
import { Button } from "~/src/shared/ui/Button";
import { IconArrowTopRight } from "~/src/shared/ui/icons";
import { ROUTES } from "~/src/shared/routes";

const { settings } = defineProps<{ settings: BlockCategoryType }>();

const { data: categories } = useQuery({
  key: ["home-categories-carousel"],
  query: async () => await getCategories(settings.collection, settings.limit),
});

const categoryCarousel = ref();
const activeSlide = ref(0);
const carouselConfig = {
  gap: 0,
  breakpointMode: "carousel",
  wrapAround: false,
  snapAlign: "start",
  itemsToShow: 2,
  breakpoints: {
    991: {
      itemsToShow: 2,
    },
    300: {
      itemsToShow: 1,
    },
  },
} as const;
const maxSlideIndex = categories.value ? categories.value.length - 1 : 0;
const prevHandler = () =>
  activeSlide.value ? categoryCarousel.value?.prev() : null;
const nextHandler = () =>
  activeSlide.value < maxSlideIndex ? categoryCarousel.value?.next() : null;
const { getThumbnail: img } = useDirectusFiles();
</script>

<template>
  <section class="categories-carousel force-full-width">
    <div class="wrapper">
      <HeadingWith>
        <template #heading>
          <LargeHeading :heading="settings.heading" />
        </template>
        <template #nav>
          <CarouselNavigation
            v-model="activeSlide"
            variant="dark"
            :loop="false"
            :max="maxSlideIndex"
            @prev="prevHandler"
            @next="nextHandler"
          />
        </template>
      </HeadingWith>
      <Carousel
        v-bind="carouselConfig"
        ref="categoryCarousel"
        v-model="activeSlide"
      >
        <Slide v-for="category in categories" :key="category.id">
          <div class="categories-carousel__item">
            <NuxtImg
              :src="
                img(category.thumbnail, {
                  format: 'webp',
                })
              "
            />
            <div class="categories-carousel__item__info">
              <h3 class="categories-carousel__item__info__title">
                {{ category.title }}
              </h3>
              <NuxtLink :to="ROUTES.category(category.slug)">
                <Button variant="fill" size="large" class="btn-square">
                  <IconArrowTopRight />
                </Button>
              </NuxtLink>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
