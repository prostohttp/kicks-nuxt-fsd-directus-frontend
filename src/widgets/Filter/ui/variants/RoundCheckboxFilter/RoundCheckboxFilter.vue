<script setup lang="ts">
import type { OptionValueType } from "~/src/shared/api";

const { values } = defineProps<{ values: OptionValueType }>();
</script>

<template>
  <section class="round-checkbox-filter">
    {{ values }}
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
