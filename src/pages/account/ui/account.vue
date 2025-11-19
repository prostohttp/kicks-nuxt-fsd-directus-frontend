<script setup lang="ts">
import { LogoutButton } from "~/src/features/auth";

useSeoMeta({
  title: "Account page"
})
</script>

<template>
  <section class="account-page">
    <LogoutButton> Log Out </LogoutButton>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
