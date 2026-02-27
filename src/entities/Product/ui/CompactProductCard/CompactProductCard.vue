<script setup lang="ts">
import type { OptionValueApi } from "~/src/entities/Option/@x/Product";
import { formatUSD } from "~/src/shared/lib";
import { Select, type SelectItemType } from "~/src/shared/ui/form";
import { ROUTES } from "~/src/shared/routes";
import { IconChevronDown } from "~/src/shared/ui/icons";

const {
  title,
  image,
  price,
  type,
  slug,
  optionValues,
  isUpdated,
  isDeletable = false,
} = defineProps<{
  title: string;
  image: string;
  price: number;
  slug: string;
  type: "select" | "counter";
  optionValues?: OptionValueApi[];
  isUpdated?: boolean;
  isDeletable?: boolean;
}>();

const emit = defineEmits<{
  changeCount: [];
}>();

const increaseCount = () => {
  count.value++;
  emit("changeCount");
};

const decreaseCount = () => {
  if (count.value > 1) {
    count.value--;
    emit("changeCount");
  }
};

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

const isDisableButton = computed(
  () => count.value <= 1 && "opacity: 0.3;cursor:default",
);
</script>

<template>
  <section class="compact-product-card">
    <div class="compact-product-card__image">
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
    <div class="compact-product-card__info">
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
    <div class="compact-product-card__price">
      {{ formatUSD(priceXCount) }}
    </div>
    <Select
      v-if="type === 'select'"
      v-model="count"
      :list
      class="compact-product-card__qty"
    />
    <div v-if="type === 'counter'" class="cart-count">
      <div class="cart-count__value">
        <span>Quantity</span>
        <strong>{{ count }}</strong>
      </div>
      <div class="cart-count__actions">
        <button
          class="cart-count__actions__increase"
          :disabled="isUpdated"
          @click="increaseCount"
        >
          <IconChevronDown :style="{ rotate: '180deg' }" />
        </button>
        <button
          class="cart-count__actions__decrease"
          :disabled="isUpdated"
          :style="isDisableButton"
          @click="decreaseCount"
        >
          <IconChevronDown />
        </button>
      </div>
    </div>
    <div v-if="isDeletable"></div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
