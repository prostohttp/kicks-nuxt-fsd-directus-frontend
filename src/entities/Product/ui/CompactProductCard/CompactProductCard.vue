<script setup lang="ts">
import type { OptionValueApi } from "~/src/entities/Option/@x/Product";
import { formatUSD } from "~/src/shared/lib";
import { Select, type SelectItemType } from "~/src/shared/ui/form";
import { ROUTES } from "~/src/shared/routes";

const { title, image, price, type, slug, optionValues } = defineProps<{
  title: string;
  image: string;
  price: number;
  slug: string;
  type: "select" | "counter";
  optionValues?: OptionValueApi[];
}>();

const count = defineModel<number>({ required: true });

const priceXCount = computed(() => price * Number(count.value));

const list: SelectItemType[] = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
];

const queryParams = computed(() => {
  const queryObject = optionValues?.map((el) => ({
    [el.option.title.toLocaleLowerCase()]: el.title,
  }));

  return queryObject ? Object.assign({}, ...queryObject) : undefined;
});
</script>

<template>
  <section class="fast-order-product-card">
    <div class="fast-order-product-card__image">
      <NuxtLink
        :to="{
          path: ROUTES.product(slug),
          query: queryParams,
        }"
      >
        <NuxtImg
          provider="directus"
          loading="lazy"
          format="webp"
          :width="150"
          :src="image"
        />
      </NuxtLink>
    </div>
    <div class="fast-order-product-card__info">
      <p>
        <NuxtLink
          :to="{
            path: ROUTES.product(slug),
            query: queryParams,
          }"
        >
          {{ title }}
        </NuxtLink>
      </p>
      <ul v-if="optionValues && optionValues.length">
        <li v-for="option in optionValues" :key="option.id">
          <strong>{{ option.option.title.toLocaleLowerCase() }}: </strong>
          <span>{{ option.title.toLocaleLowerCase() }}</span>
        </li>
      </ul>
    </div>
    <div class="fast-order-product-card__price">
      {{ formatUSD(priceXCount) }}
    </div>
    <Select
      v-if="type === 'select'"
      v-model="count"
      :list
      class="fast-order-product-card__qty"
    />
    <div v-if="type === 'counter'">{{ count }}</div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
