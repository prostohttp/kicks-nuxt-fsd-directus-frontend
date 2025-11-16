<script setup lang="ts">
import IconStarFill from "../icons/IconStarFill.vue";
import IconStarOutline from "../icons/IconStarOutline.vue";

const value = defineModel<number>({ required: true });
const { change = false } = defineProps<{ change?: boolean }>();
</script>

<template>
  <section class="star-rating">
    <span
      v-for="num in 5"
      :key="num"
      class="star-rating__icon"
      :style="change ? 'cursor: pointer;' : null"
      @click="change ? (value = num) : null"
    >
      <IconStarFill v-if="value >= num" />
      <IconStarOutline v-else />
    </span>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
