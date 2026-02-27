<script setup lang="ts">
const { heading } = defineProps<{ heading: string }>();
</script>

<template>
  <section class="small-heading">
    <h3 class="small-heading__title">
      {{ heading }}
    </h3>
    <p class="small-heading__subtitle"><slot /></p>
    <p class="small-heading__links"><slot name="links" /></p>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
