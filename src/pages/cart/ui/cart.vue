<script setup lang="ts">
import { LOCAL_CART_KEY, useCartStore } from "~/src/entities/Cart";
import { OrderSummary } from "~/src/entities/Order";
import { EmptyDataHeading, SmallHeading } from "~/src/shared/ui/heading";
import { Preloader } from "~/src/shared/ui/preloader";
import { CartList } from "~/src/widgets/CartList";
import { ROUTES } from "~/src/shared/routes";

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
    // TODO: use if need delete local cart when server card not empty
    // updataLocalStorageByKey(LOCAL_CART_KEY, data.value);
  } else if (!data.value && localCart) {
    cart.value = JSON.parse(localCart);
  }
  isLoading.value = false;
});

const user = useDirectusUser();
</script>

<template>
  <section class="cart-page">
    <Preloader v-if="isLoading" />
    <div
      v-else-if="!isLoading && cart?.product.length"
      class="cart-page__content"
    >
      <SmallHeading
        heading="Saving to celebrate"
        class="cart-page__content__heading"
      >
        Enjoy up to 60% off thousands of styles during the End of Year sale -
        while supplies last. No code needed.
        <template v-if="!user" #links>
          <NuxtLink :to="ROUTES.auth">Join us</NuxtLink>
          or
          <NuxtLink :to="ROUTES.auth">Sign-in</NuxtLink>
        </template>
      </SmallHeading>
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
