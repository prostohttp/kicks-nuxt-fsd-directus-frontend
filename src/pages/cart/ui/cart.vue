<script setup lang="ts">
import { useCartStore } from "~/src/entities/Cart";
import { EmptyDataHeading, SmallHeading } from "~/src/shared/ui/heading";
import { Preloader } from "~/src/shared/ui/preloader";
import { CartList } from "~/src/widgets/CartList";
import { ROUTES } from "~/src/shared/routes";
import OrderSummary from "~/src/widgets/Order/ui/OrderSummary/OrderSummary.vue";
import { Button } from "~/src/shared/ui/form";
import { useAppUser } from "~/src/entities/User";

const cartStore = useCartStore();

const { cart, isReady } = storeToRefs(cartStore);

const user = useAppUser();
</script>

<template>
  <section class="cart-page">
    <Preloader v-if="!isReady" />
    <div v-else-if="cart?.product.length" class="cart-page__content">
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
        <div class="cart-page__content__wrapper__products">
          <CartList />
        </div>
        <div class="cart-page__content__wrapper__order">
          <div class="sticky-order">
            <OrderSummary />
            <NuxtLink v-if="user" :to="ROUTES.checkout">
              <Button variant="fill" size="large"> Checkout </Button>
            </NuxtLink>
            <NuxtLink v-else :to="ROUTES.auth">
              <Button variant="fill" size="large"> Sign In </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <EmptyDataHeading v-else> Empty cart </EmptyDataHeading>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
