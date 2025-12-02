<script setup lang="ts">
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";

const { values, queryString } = defineProps<ApiFilterType>();
</script>

<template>
  <section class="radio-filter">
    {{ values }}
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
