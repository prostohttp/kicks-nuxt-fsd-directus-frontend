<script setup lang="ts">
import { CollectionType } from "~/src/shared/api";
import { getProduct } from "../api";
import { Preloader } from "~/src/shared/ui/preloader";
import { NotFound } from "~/src/shared/ui/NotFound";

const route = useRoute();
const productSlug = computed(() =>
  "product" in route.params ? (route.params.product as string) : null,
);
const { data, isLoading } = useQuery({
  key: () => ["product", productSlug.value],
  query: async () => getProduct(CollectionType.PRODUCTS, productSlug.value),
});
const product = computed(() => (data.value ? data.value[0] : null));
useSeoMeta({
  title: () => product.value?.seo.title,
  description: () => product.value?.seo.meta_description,
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <NotFound v-else-if="!product" heading="Product not found!" />
  <section v-else class="product-page">
    <pre>{{ product }}</pre>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
