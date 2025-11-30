<script setup lang="ts">
import { ROUTES } from "~/src/shared/routes";
import type { ProductCardType } from "../../model/types";
import { Button } from "~/src/shared/ui/Button";
import { formatUSD } from "~/src/shared/lib";

const { image, label, title, price, slug } = defineProps<ProductCardType>();
</script>

<template>
  <section class="product-card">
    <div class="product-card__image">
      <NuxtImg
        provider="directus"
        :src="image"
        format="webp"
        loading="lazy"
        :alt="title"
      />
      <span v-if="label" class="product-card__image__label">{{ label }}</span>
    </div>
    <h3 class="product-card__title">{{ title }}</h3>
    <NuxtLink :to="ROUTES.product(slug)">
      <Button
        variant="fill"
        size="large"
        class="product-card__button"
        style="justify-content: center"
      >
        View Product - &nbsp;<strong>{{ formatUSD(price) }}</strong>
      </Button>
    </NuxtLink>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
