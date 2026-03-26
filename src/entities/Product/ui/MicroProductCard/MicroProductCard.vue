<script setup lang="ts">
import type { OptionValueApi } from "~/src/entities/Option/@x/Product";
import { formatUSD } from "~/src/shared/lib";
import { ROUTES } from "~/src/shared/routes";
import type { ProductCartInStoreType } from "~/src/entities/Cart/@x/Product";

const { product: item, optionValues } = defineProps<{
  product: ProductCartInStoreType;
  optionValues?: OptionValueApi[];
}>();

const priceXCount = computed(() => item.product.price * Number(item.count));

const queryParams = computed(() => {
  const queryObject = optionValues?.map((el) => ({
    [el.option.title.toLocaleLowerCase()]: el.title,
  }));

  return queryObject ? Object.assign({}, ...queryObject) : undefined;
});
</script>

<template>
  <section class="micro-product-card">
    <div class="micro-product-card__image">
      <NuxtLink
        :to="{
          path: ROUTES.product(item.product.slug),
          query: queryParams,
        }"
      >
        <NuxtImg
          provider="directus"
          loading="lazy"
          format="webp"
          :width="150"
          :src="item.product.image"
        />
      </NuxtLink>
    </div>
    <div class="micro-product-card__info">
      <p>
        <NuxtLink
          :to="{
            path: ROUTES.product(item.product.slug),
            query: queryParams,
          }"
        >
          {{ item.product.title }}
        </NuxtLink>
      </p>
      <ul v-if="optionValues && optionValues.length">
        <li v-for="option in optionValues" :key="option.id">
          <strong>{{ option.option.title.toLocaleLowerCase() }}: </strong>
          <span>{{ option.title.toLocaleLowerCase() }}</span> /
        </li>
      </ul>
      <div class="micro-product-card__info__count">
        <div class="micro-product-card__info__count__value">
          <span>Quantity</span>
          <strong>{{ item.count }}</strong>
        </div>
      </div>
      <div class="micro-product-card__info__price">
        {{ formatUSD(priceXCount) }}
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
