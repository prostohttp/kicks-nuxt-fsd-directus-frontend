<script setup lang="ts">
import { LogoutButton } from "~/src/features/auth";

useSeoMeta({
  title: "Account page",
});

const directusUser = useDirectusUser();
</script>

<template>
  <section class="account-page">
    <pre>{{ directusUser }}</pre>
    <LogoutButton> Log Out </LogoutButton>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
