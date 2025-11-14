<script setup lang="ts">
import { getBlockProducts } from "~/src/shared/api";
import { ProductList } from "~/src/widgets/Product/ProductList";

const { itemId } = defineProps<{ itemId: string }>();
const { data } = useQuery({
  key: ["home-products-grid-block"],
  query: async () => await getBlockProducts(itemId),
});
</script>

<template>
  <ProductList v-if="data" :settings="data" label="New" />
</template>
