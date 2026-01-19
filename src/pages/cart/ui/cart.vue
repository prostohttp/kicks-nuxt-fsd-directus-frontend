<script setup lang="ts">
import {
  LOCAL_CART_KEY,
  updataLocalStorageByKey,
  useCartStore,
} from "~/src/entities/Cart";
import { OrderSummary } from "~/src/entities/Order";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { Preloader } from "~/src/shared/ui/preloader";
import { AppCart } from "~/src/widgets/AppCart";

const cartStore = useCartStore();

const { cart } = storeToRefs(cartStore);

const { data } = useQuery({
  key: () => ["app-cart"],
  query: async () => {
    return await cartStore.getUserCart();
  },
});

const isLoading = ref(true);

onMounted(() => {
  const localCart = localStorage.getItem(LOCAL_CART_KEY);
  if (data.value) {
    cart.value = data.value;
    updataLocalStorageByKey(LOCAL_CART_KEY, data.value);
  } else if (!data.value && localCart) {
    cart.value = JSON.parse(localCart);
  }
  isLoading.value = false;
});
</script>

<template>
  <section class="cart-page">
    <Preloader v-if="isLoading" />
    <div v-else-if="!isLoading && cart" class="cart-page__content">
      <AppCart class="cart-page__content__products" />
      <OrderSummary class="cart-page__content__order" />
    </div>
    <EmptyDataHeading v-else> Empty cart </EmptyDataHeading>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
