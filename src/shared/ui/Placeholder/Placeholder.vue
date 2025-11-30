<script setup lang="ts">
const {
  w = "100%",
  h = "100%",
  m = "10px 0",
} = defineProps<{
  w?: string;
  h?: string;
  m?: string;
}>();
</script>

<template>
  <div
    class="animate-pulse placeholder"
    :style="{
      width: w,
      height: h,
      margin: m,
    }"
  ></div>
</template>

<style lang="scss">
@use "styles";
</style>
