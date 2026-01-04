<script setup lang="ts">
import { formatUSD } from "~/src/shared/lib";
import { Select, type SelectItemType } from "~/src/shared/ui/form";

const { title, image, price, options } = defineProps<{
  id: number;
  title: string;
  image: string;
  price: number;
  options: {
    [key: string]: string | undefined;
  }[];
  optionIds?: string[];
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
</script>

<template>
  <section class="fast-order-product-card">
    <div class="fast-order-product-card__image">
      <NuxtImg
        provider="directus"
        loading="lazy"
        format="webp"
        :width="150"
        :src="image"
      />
    </div>
    <div class="fast-order-product-card__info">
      <p>{{ title }}</p>
      <ul v-if="options.length">
        <li v-for="(option, index) in options" :key="index">
          <strong>{{ Object.keys(option)[0] }}:</strong>
          <span>{{ Object.values(option)[0] }}</span>
        </li>
      </ul>
    </div>
    <div class="fast-order-product-card__price">
      {{ formatUSD(priceXCount) }}
    </div>
    <Select v-model="count" :list class="fast-order-product-card__qty" />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
