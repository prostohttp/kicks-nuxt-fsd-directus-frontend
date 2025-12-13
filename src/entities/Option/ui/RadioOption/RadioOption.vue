<script setup lang="ts">
import type { PropsOptionType } from "../../model/types";

// TODO: do it!
const { values, queryString } = defineProps<PropsOptionType>();
</script>

<template>
  <section class="radio-filter">
    {{ values }}
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
