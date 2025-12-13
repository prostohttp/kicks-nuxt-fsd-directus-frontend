<script setup lang="ts">
import { ROUTES } from "~/src/shared/routes";
import type { ProductCardType } from "../../model/types";
import { formatUSD } from "~/src/shared/lib";
import { Button } from "~/src/shared/ui/form";

const { image, label, title, price, slug } = defineProps<ProductCardType>();
</script>

<template>
  <section class="product-card">
    <div class="product-card__image">
      <NuxtLink :to="ROUTES.product(slug)">
        <NuxtImg
          provider="directus"
          :src="image"
          format="webp"
          :width="310"
          loading="lazy"
          :alt="title"
        />
      </NuxtLink>

      <span v-if="label" class="product-card__image__label">{{ label }}</span>
    </div>
    <h3 class="product-card__title">
      <NuxtLink :to="ROUTES.product(slug)">
        {{ title }}
      </NuxtLink>
    </h3>
    <NuxtLink :to="ROUTES.product(slug)">
      <Button
        variant="fill"
        size="large"
        class="product-card__button"
        style="justify-content: center"
      >
        <span>View Product - </span>
        <strong>{{ formatUSD(price) }}</strong>
      </Button>
    </NuxtLink>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
