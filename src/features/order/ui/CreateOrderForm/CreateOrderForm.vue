<script setup lang="ts">
import { useCartStore } from "~/src/entities/Cart";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
</script>

<template>
  <section class="create-order-form">
    <pre>{{ cart }}</pre>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
