<script setup lang="ts">
import { Logo } from "~/src/shared/ui/Logo";
import { MainMenu } from "~/src/shared/ui/navigation";
import { IconAccount, IconSearch } from "~/src/shared/ui/icons";
import { ROUTES } from "~/src/shared/routes";
import { getMainMenu } from "~/src/shared/api";
import { CartCount } from "~/src/entities/Cart";

const { data: menu } = useQuery({
  key: ["main-menu"],
  query: async () => await getMainMenu(),
});

const user = useDirectusUser();
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
      <CartCount />
    </div>
  </header>
</template>

<style lang="scss">
@use "styles";
</style>
