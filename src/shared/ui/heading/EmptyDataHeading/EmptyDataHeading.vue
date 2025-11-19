<script setup lang="ts">
const { variant = "light" } = defineProps<{
  variant?: "light" | "dark";
}>();
</script>

<template>
  <section class="empty-data-heading">
    <h4 :class="{ 'empty-data-heading__dark': variant === 'dark' }">
      <slot>
        Nothing there ...
      </slot>
    </h4>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
