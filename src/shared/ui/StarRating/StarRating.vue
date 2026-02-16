<script setup lang="ts">
import IconStarFill from "../icons/IconStarFill.vue";
import IconStarOutline from "../icons/IconStarOutline.vue";

const value = defineModel<number>({ required: true });
const { change = false, size = "small" } = defineProps<{
  change?: boolean;
  size?: "small" | "large";
}>();
</script>

<template>
  <section
    class="star-rating"
    :class="{ 'star-rating--large': size === 'large' }"
  >
    <span
      v-for="num in 5"
      :key="num"
      class="star-rating__icon"
      :style="change && 'cursor: pointer;'"
      @click="change && (value = num)"
    >
      <IconStarFill v-if="value >= num" />
      <IconStarOutline v-else />
    </span>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
