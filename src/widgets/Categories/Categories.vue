<script setup lang="ts">
import type { BlockCategoryType } from "~/src/shared/api";
import { getCategories } from "./api";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import {
  EmptyDataHeading,
  HeadingWith,
  LargeHeading,
} from "~/src/shared/ui/heading";
import { Button } from "~/src/shared/ui/Button";
import { IconArrowTopRight } from "~/src/shared/ui/icons";
import { ROUTES } from "~/src/shared/routes";
import { Preloader } from "~/src/shared/ui/preloader";

const { settings } = defineProps<{ settings: BlockCategoryType }>();

const { data: categories, isLoading } = useQuery({
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
const prevHandler = () => categoryCarousel.value?.prev();
const nextHandler = () => categoryCarousel.value?.next();
const { getThumbnail: img } = useDirectusFiles();
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="categories-carousel force-full-width">
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
            :max="categories ? categories.length - 1 : 0"
            @prev="prevHandler"
            @next="nextHandler"
          />
        </template>
      </HeadingWith>
      <Carousel
        v-if="categories?.length"
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
      <EmptyDataHeading v-else variant="dark" />
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
