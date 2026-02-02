<script setup lang="ts">
import { LOCAL_CART_KEY, useCartStore } from "~/src/entities/Cart";
import { OrderSummary } from "~/src/entities/Order";
import { EmptyDataHeading } from "~/src/shared/ui/heading";
import { Preloader } from "~/src/shared/ui/preloader";
import { CartList } from "~/src/widgets/CartList";

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
    // TODO: use if need sync local and server cart
    // updataLocalStorageByKey(LOCAL_CART_KEY, data.value);
  } else if (!data.value && localCart) {
    cart.value = JSON.parse(localCart);
  }
  isLoading.value = false;
});
</script>

<template>
  <section class="cart-page">
    <Preloader v-if="isLoading" />
    <div v-else-if="!isLoading && cart?.product.length" class="cart-page__content">

      <div class="cart-page__content__wrapper">
        <CartList class="cart-page__content__wrapper__products" />
        <OrderSummary class="cart-page__content__wrapper__order" />
      </div>
    </div>
    <EmptyDataHeading v-else> Empty cart </EmptyDataHeading>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
