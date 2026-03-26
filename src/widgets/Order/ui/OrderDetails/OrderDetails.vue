<script setup lang="ts">
import { useCartStore } from "~/src/entities/Cart";
import { MicroProductCard } from "~/src/entities/Product";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
</script>

<template>
  <section class="order-details">
    <h3 class="order-details__heading">Order details</h3>
    <MicroProductCard
      v-for="product in cart?.product"
      :key="product.id"
      :product="product"
      :option-values="product.options.map((el) => ({ ...el.option_values_id }))"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
