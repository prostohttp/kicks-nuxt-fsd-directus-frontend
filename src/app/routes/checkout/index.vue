<script setup lang="ts">
import { Checkout } from "~/src/pages/checkout";

definePageMeta({
  middleware: "checkout",
});
</script>

<template>
  <Checkout />
</template>
