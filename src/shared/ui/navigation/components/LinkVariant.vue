<script setup lang="ts">
import { ROUTES } from "~/src/shared/routes";
import { MenuTypes, type NavigationItem } from "../types";

const { category, page, product, title, type, url } =
  defineProps<NavigationItem>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <span class="link-variant-wrapper">
    <NuxtLink
      v-if="type === MenuTypes.Url"
      :to="url || ''"
      external
      target="_blank"
      v-bind="$attrs"
    >
      {{ title }}
    </NuxtLink>
    <NuxtLink
      v-if="type === MenuTypes.Product && product"
      :to="ROUTES.product(product.slug)"
      v-bind="$attrs"
    >
      {{ title }}
    </NuxtLink>
    <NuxtLink
      v-if="type === MenuTypes.Category && category"
      :to="ROUTES.category(category.slug)"
      v-bind="$attrs"
    >
      {{ title }}
    </NuxtLink>
    <NuxtLink
      v-if="type === MenuTypes.Page && page"
      :to="ROUTES.page(page.permalink)"
      v-bind="$attrs"
    >
      {{ title }}
    </NuxtLink>
  </span>
</template>

<style lang="scss">
.link-variant-wrapper {
  width: 100%;

  @media (max-width: 991px) {
    display: block;
    text-align: center;
    padding: 20px 16px;
  }

  a {
    height: 100%;
    width: 100%;
    display: flex;

    @media (max-width: 991px) {
      display: inline;
    }
  }
}
</style>
