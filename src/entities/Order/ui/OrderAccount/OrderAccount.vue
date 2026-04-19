<script setup lang="ts">
import type { OrderWithCartTypeApi } from "../../api/types";

const { order } = defineProps<{
  order: OrderWithCartTypeApi;
}>();
</script>

<template>
  <section class="order-account">
    {{ order }}
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
