<script setup lang="ts">
const { heading } = defineProps<{ heading: string }>();
</script>

<template>
  <h3 class="medium-heading">
    {{ heading }}
  </h3>
</template>

<style lang="scss">
@use "styles";
</style>
