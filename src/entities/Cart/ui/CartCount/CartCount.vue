<script setup lang="ts">
import { ROUTES } from "~/src/shared/routes/routes";
import { useCartStore } from "../../model/stores/cart";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const { isLoading } = useQuery({
  key: () => ["cart-count"],
  query: async () => {
    const userCart = await cartStore.getUserCart();
    cart.value = userCart;
    return userCart;
  },
  placeholderData: (previousData) => previousData,
});

const count = computed(() => (cart.value ? cart.value.product.length : 0));
</script>

<template>
  <div class="mini-cart">
    <NuxtLink :to="ROUTES.cart" class="mini-cart__count">
      <span v-if="!isLoading">{{ count }}</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
