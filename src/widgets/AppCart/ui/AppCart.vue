<script setup lang="ts">
import { useCartStore } from "~/src/entities/Cart";

defineOptions({ inheritAttrs: false });

const cartStore = useCartStore();

const { cart } = storeToRefs(cartStore);


</script>

<template>
  <section v-if="cart" class="app-cart" v-bind="$attrs">
    <pre>{{ cart }}</pre>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
