<script setup lang="ts">
import type { ApiFilterType } from '../../../model/types';

// TODO: do it!
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
