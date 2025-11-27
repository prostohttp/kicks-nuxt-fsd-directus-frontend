<script setup lang="ts">
import { getBlockProducts } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/Button";
import { CarouselNavigation } from "~/src/shared/ui/carousel";
import { Select, type SelectItemType } from "~/src/shared/ui/form";
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
const sortList: SelectItemType[] = reactive([
  {
    label: "Default",
    value: "",
  },
  {
    label: "Price up",
    value: "price",
  },
  {
    label: "Price down",
    value: "-price",
  },
  {
    label: "Newest",
    value: "-date_created",
  },
  {
    label: "Latest",
    value: "date_created",
  },
]);
const route = useRoute();
const initialSortValue = () => {
  const sortQuery = route.query.sort;
  if (sortQuery) {
    const sortListItem = sortList.find((item) => item.value === sortQuery);
    return sortListItem?.label || "Default";
  } else {
    return "Default";
  }
};
const sortValue = ref(initialSortValue());
const sortQuery = computed(() => {
  const sort = sortList.find((item) => item.label === sortValue.value);
  return sort?.value || "";
});

watch(sortValue, (newValue) => {
  if (newValue) {
    navigateTo({
      query: {
        ...route.query,
        sort: sortQuery.value,
      },
    });
  }
});
const filter = computed(() =>
  data.value?.label
    ? {
        label: { _eq: data.value.label },
      }
    : undefined,
);
const productsRef = useTemplateRef("productsRef");
const scrollToProductsRef = () => productsRef.value?.scrollIntoView();
</script>

<template>
  <section ref="productsRef" class="products-block">
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
        <template #right>
          <Select v-model="sortValue" :list="sortList" />
        </template>
      </HeadingWith>
    </div>
    <ProductList
      v-if="data"
      ref="productRef"
      :filter="filter"
      :settings="data"
      @scroll-into="scrollToProductsRef"
    />
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
