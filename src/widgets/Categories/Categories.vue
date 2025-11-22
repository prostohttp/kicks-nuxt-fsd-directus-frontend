<script setup lang="ts">
import type { CollectionType } from "~/src/shared/api";
import { getCategories } from "./api";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { Button } from "~/src/shared/ui/Button";
import { IconArrowTopRight } from "~/src/shared/ui/icons";
import { ROUTES } from "~/src/shared/routes";
import { Preloader } from "~/src/shared/ui/preloader";

const { collection, limit } = defineProps<{
  collection: CollectionType;
  limit: number;
}>();
const activeSlide = defineModel<number>();
const { data: categories, isLoading } = useQuery({
  key: () => ["categories-carousel", { limit }],
  query: async () => await getCategories(collection, limit),
});

const categoryCarousel = ref();

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

const { getThumbnail: img } = useDirectusFiles();
const max = computed(() =>
  categories.value ? categories.value.length - 1 : 0,
);
defineExpose({
  categoryCarousel,
  max: max.value,
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="categories-carousel wrapper">
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
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
