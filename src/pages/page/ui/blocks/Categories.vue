<script setup lang="ts">
import { CollectionType, getBlockCategories } from "~/src/shared/api";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import {
  EmptyDataHeading,
  HeadingWith,
  LargeHeading,
} from "~/src/shared/ui/heading";
import { Preloader } from "~/src/shared/ui/preloader";
import { getCategories } from "../../api";
import { ROUTES } from "~/src/shared/routes";
import { IconArrowTopRight } from "~/src/shared/ui/icons";
import { Button } from "~/src/shared/ui/form";

const { itemId } = defineProps<{ itemId: string }>();
const { data, isLoading } = useQuery({
  key: () => ["categories-carousel", itemId],
  query: async () => await getBlockCategories(itemId),
});

const activeSlide = ref(0);

const { data: categories, isLoading: catIsLoading } = useQuery({
  key: () => ["categories-carousel", { limit: data.value?.limit }],
  query: async () =>
    await getCategories(CollectionType.CATEGORIES, data.value?.limit),
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

const max = computed(() =>
  categories.value ? categories.value.length - 1 : 0,
);
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="categories-block force-full-width">
    <HeadingWith class="wrapper">
      <template #left>
        <LargeHeading v-if="data" :heading="data.heading" />
      </template>
      <template #right>
        <CarouselNavigation
          v-model="activeSlide"
          variant="dark"
          :loop="false"
          :max="max"
          @prev="categoryCarousel.prev()"
          @next="categoryCarousel.next()"
        />
      </template>
    </HeadingWith>
    <Preloader v-if="catIsLoading" />
    <section v-else-if="categories" class="categories-carousel wrapper">
      <Carousel
        v-if="categories?.length"
        v-bind="carouselConfig"
        ref="categoryCarousel"
        v-model="activeSlide"
      >
        <Slide v-for="category in categories" :key="category.id">
          <div class="categories-carousel__item">
            <NuxtLink :to="ROUTES.category(category.slug)">
              <NuxtImg
                provider="directus"
                format="webp"
                loading="lazy"
                :src="category.thumbnail"
              />
            </NuxtLink>

            <div class="categories-carousel__item__info">
              <h3 class="categories-carousel__item__info__title">
                <NuxtLink :to="ROUTES.category(category.slug)">
                  {{ category.title }}
                </NuxtLink>
              </h3>
              <NuxtLink
                :to="ROUTES.category(category.slug)"
                class="categories-carousel__item__info__icon-link"
              >
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
  </section>
</template>

<style lang="scss">
.categories-block {
  background-color: #232321;
  color: #fff;
  padding-top: 40px;
  overflow: hidden;
  margin-top: 80px;

  .heading-with {
    padding-bottom: 10px;
  }

  @media (max-width: 991px) {
    padding-top: 0;
    margin-top: 30px;
  }

  .carousel__viewport {
    overflow: visible;

    @media (max-width: 991px) {
      overflow: hidden;
    }
  }

  .carousel__slide {
    padding: 30px 48px;

    &:first-child {
      border-top-left-radius: 64px;

      @media (max-width: 991px) {
        border-top-left-radius: 24px;
      }
    }

    &:nth-child(odd) {
      background-color: #eceef0;
    }

    &:nth-child(even) {
      background-color: #f6f6f6;
    }
  }
}

.categories-carousel {
  margin-bottom: 0;
  padding: 0;

  &__item {
    width: 100%;

    img {
      width: 70%;
      margin: 0 auto;
      display: flex;

      @media (max-width: 991px) {
        width: 70%;
      }
    }

    .btn {
      svg {
        scale: 1.5;
      }
    }

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      &__title {
        font-size: 36px;
        font-weight: 600;
        text-transform: uppercase;
        width: 50%;
        color: #232321;

        a {
          text-decoration: none;
          color: #232321;
        }

        @media (max-width: 991px) {
          font-size: 24px;
        }
      }

      &__icon-link {
        width: 50%;
        margin-bottom: 5px;
        display: flex;
        justify-content: flex-end;

        @media (max-width: 991px) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
