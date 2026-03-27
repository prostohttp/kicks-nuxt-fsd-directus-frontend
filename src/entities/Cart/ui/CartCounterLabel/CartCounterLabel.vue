<script setup lang="ts">
import { ROUTES } from "~/src/shared/routes/";
import { useCartStore } from "../../model/stores/cart";

const cartStore = useCartStore();
const { cart, isReady } = storeToRefs(cartStore);

const count = computed(() => (cart.value ? cart.value.product.length : 0));
</script>

<template>
  <div class="mini-cart">
    <NuxtLink :to="ROUTES.cart" class="mini-cart__count">
      <span v-if="isReady">{{ count }}</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
