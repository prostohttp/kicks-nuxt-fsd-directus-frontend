<script setup lang="ts">
import { getBlockCategories } from "~/src/shared/api";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import { HeadingWith, LargeHeading } from "~/src/shared/ui/heading";
import { Categories } from "~/src/widgets/Categories";

const { itemId } = defineProps<{ itemId: string }>();
const { data } = useQuery({
  key: () => ["categories-carousel", itemId],
  query: async () => await getBlockCategories(itemId),
});

const exposeRef = useTemplateRef("exposeRef");
const activeSlide = ref(0);
</script>

<template>
  <section class="categories-block force-full-width">
    <HeadingWith class="wrapper">
      <template #left>
        <LargeHeading v-if="data" :heading="data.heading" />
      </template>
      <template #right>
        <CarouselNavigation
          v-model="activeSlide"
          variant="dark"
          :loop="false"
          :max="exposeRef?.max"
          @prev="exposeRef?.categoryCarousel.prev()"
          @next="exposeRef?.categoryCarousel.next()"
        />
      </template>
    </HeadingWith>
    <Categories
      v-if="data"
      ref="exposeRef"
      v-model="activeSlide"
      :collection="data.collection"
      :limit="data.limit"
    />
  </section>
</template>

<style lang="scss">
.categories-block {
  background-color: #232321;
  color: #fff;
  padding-top: 40px;

  @media (max-width: 991px) {
    padding-top: 20px;
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
</style>
