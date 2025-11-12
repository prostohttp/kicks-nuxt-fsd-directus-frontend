<script setup lang="ts">
import { AppFooter } from "~/src/widgets/AppFooter";
import { AppHeader } from "~/src/widgets/AppHeader";
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
