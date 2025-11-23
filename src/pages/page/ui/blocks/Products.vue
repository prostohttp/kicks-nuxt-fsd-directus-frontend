<script setup lang="ts">
import { getBlockProducts } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/Button";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import {
  HeadingWith,
  LargeHeading,
  MediumHeading,
  SmallHeading,
} from "~/src/shared/ui/heading";
import { ProductList } from "~/src/widgets/Product/ProductList";

const { itemId } = defineProps<{ itemId: string }>();
const { data } = useQuery({
  key: () => ["products", itemId],
  query: async () => await getBlockProducts(itemId),
});

const productRef = ref();
</script>

<template>
  <section class="products-block">
    <div v-if="data && data.heading" class="products-block__heading">
      <HeadingWith v-if="data.is_carousel">
        <template #left>
          <MediumHeading :heading="data.heading" />
        </template>
        <template #right>
          <CarouselNavigation
            @prev="productRef?.productCarousel.prev()"
            @next="productRef?.productCarousel.next()"
          />
        </template>
      </HeadingWith>
      <HeadingWith v-else-if="data.button_text">
        <template #left>
          <LargeHeading :heading="data.heading" />
        </template>
        <template #right>
          <NuxtLink v-if="data.button_url" :to="data.button_url">
            <Button
              variant="fill"
              size="large"
              style="background-color: #416aea; justify-content: center"
            >
              {{ data.button_text }}
            </Button>
          </NuxtLink>
        </template>
      </HeadingWith>
      <HeadingWith v-else-if="data.sortable">
        <template #left>
          <SmallHeading :heading="data.heading" />
        </template>
        <template #right> sortable </template>
      </HeadingWith>
    </div>
    <ProductList v-if="data" ref="productRef" :settings="data" />
  </section>
</template>

<style lang="scss">
.products-block {
  .carousel {
    padding-bottom: 50px;

    &__pagination-button {
      width: 40px;
      height: 6px;
      background-color: #b6b6b2;
      border-radius: 8px;

      &--active {
        background-color: #416aea;
      }
    }

    &__track {
      align-items: flex-start;
    }
  }
}
</style>
