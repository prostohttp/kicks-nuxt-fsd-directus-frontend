<script setup lang="ts">
import type { ButtonType } from "./types";

const {
  variant = "fill",
  size = "normal",
  disabled = false,
  type = "button",
} = defineProps<ButtonType>();

const classFromType = computed(() => "btn-" + variant);
const classFromSize = computed(() => "btn-" + size);
</script>

<template>
  <button :type :class="['btn', classFromSize, classFromType]" :disabled>
    <slot name="left-icon" />
    <span class="btn-text">
      <slot>Button</slot>
    </span>
    <slot name="right-icon" />
  </button>
</template>

<style lang="scss">
@use "styles";
</style>
