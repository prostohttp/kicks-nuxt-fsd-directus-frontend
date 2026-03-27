<script setup lang="ts">
import { Logo } from "~/src/shared/ui/Logo";
import { MainMenu } from "~/src/shared/ui/navigation";
import { IconAccount, IconSearch } from "~/src/shared/ui/icons";
import { ROUTES } from "~/src/shared/routes";
import { getMainMenu } from "~/src/shared/api";
import {
  CartCounterLabel,
  LOCAL_CART_KEY,
  updataLocalStorageByKey,
  useCartStore,
} from "~/src/entities/Cart";
import { useActionsCartStore } from "~/src/features/cart";

const { data: menu } = useQuery({
  key: ["main-menu"],
  query: async () => await getMainMenu(),
});

const user = useDirectusUser();

const cartStore = useCartStore();
const { cart, isReady } = storeToRefs(cartStore);

const actionsCartStore = useActionsCartStore();

const { data } = useQuery({
  key: () => ["user-cart"],
  query: async () => {
    return await cartStore.getUserCart();
  },
});

onMounted(async () => {
  const localCart = localStorage.getItem(LOCAL_CART_KEY);

  if (data.value) {
    cart.value = data.value;
    await actionsCartStore.replaceCart(cart.value);
    updataLocalStorageByKey(LOCAL_CART_KEY, cart.value);
  } else if (localCart) {
    cart.value = await actionsCartStore.replaceCart({
      user_created: user.value?.id,
      ...JSON.parse(localCart),
    });

    updataLocalStorageByKey(LOCAL_CART_KEY, cart.value);
  }
  isReady.value = true;
});

watch(
  cart,
  async (newCart) => {
    if (newCart) {
      await actionsCartStore.replaceCart(newCart);
      updataLocalStorageByKey(LOCAL_CART_KEY, newCart);
    }
  },
  {
    deep: true,
  },
);
</script>

<template>
  <header class="header wrapper">
    <div class="header__menu">
      <MainMenu v-if="menu" :items="menu.items" />
    </div>
    <div class="header__logo">
      <Logo link="/" />
    </div>
    <div class="header__actions">
      <NuxtLink :to="ROUTES.search">
        <IconSearch class="icon" />
      </NuxtLink>
      <NuxtLink :to="ROUTES.account" class="icon-wrapper">
        <IconAccount class="icon" />
        <span v-if="user" class="icon-wrapper__status-accent"></span>
      </NuxtLink>
      <CartCounterLabel />
    </div>
  </header>
</template>

<style lang="scss">
@use "styles";
</style>
