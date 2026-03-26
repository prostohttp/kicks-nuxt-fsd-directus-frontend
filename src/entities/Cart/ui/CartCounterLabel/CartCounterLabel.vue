<script setup lang="ts">
import { ROUTES } from "~/src/shared/routes/";
import { useCartStore } from "../../model/stores/cart";
import { LOCAL_CART_KEY } from "../../model/types";
import { useActionsCartStore } from "~/src/features/cart";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const actionsCartStore = useActionsCartStore();

const { data } = useQuery({
  key: () => ["user-count"],
  query: async () => {
    return await cartStore.getUserCart();
  },
  placeholderData: (previousData) => previousData,
});

const isLoading = ref(true);

onMounted(async () => {
  const localCart = localStorage.getItem(LOCAL_CART_KEY);
  if (data.value) {
    cart.value = data.value;
    // TODO: use if need sync local and server cart
    // updataLocalStorageByKey(LOCAL_CART_KEY, data.value);
    if (localCart) {
      cart.value = { id: data.value.id, ...JSON.parse(localCart) };
      if (cart.value) {
        await actionsCartStore.replaceCart(cart.value);
      }
    }
  } else if (!data.value && localCart) {
    cart.value = JSON.parse(localCart);
  }
  isLoading.value = false;
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
