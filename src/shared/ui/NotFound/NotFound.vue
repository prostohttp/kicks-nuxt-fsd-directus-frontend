<script setup lang="ts">
import { ROUTES } from "../../routes";
import { Button } from "../Button";

const { heading } = defineProps<{
  heading: string;
}>();
</script>

<template>
  <section class="not-found">
    <NuxtImg src="not-found.png" :placeholder="[200, 200]" width="200" />
    <h1 class="not-found__heading">{{ heading }}</h1>
    <NuxtLink :to="ROUTES.main">
      <Button variant="fill" size="large"> Go to home </Button>
    </NuxtLink>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
