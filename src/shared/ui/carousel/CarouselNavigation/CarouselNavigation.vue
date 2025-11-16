<script lang="ts" setup>
import Button from "../../Button/Button.vue";
import { IconChevronRight } from "../../icons";

const {
  variant = "light",
  loop = true,
  max,
} = defineProps<{
  variant?: "light" | "dark";
  loop?: boolean;
  max?: number;
}>();
const activeSlide = defineModel<number>();
defineEmits<{
  prev: [];
  next: [];
}>();
const isDisabledPrev = computed(() => !loop && activeSlide.value === 0);
const isDisableNext = computed(
  () => !loop && max && activeSlide.value && activeSlide.value >= max,
);
</script>

<template>
  <section
    class="carousel-navigation"
    :class="{ 'carousel-navigation-dark': variant === 'dark' }"
  >
    <Button
      variant="fill"
      size="normal"
      :disabled="isDisabledPrev"
      class="chevron-left carousel-navigation__button btn-square"
      @click="$emit('prev')"
    >
      <IconChevronRight />
    </Button>
    <Button
      variant="fill"
      size="normal"
      :disabled="!!isDisableNext"
      class="carousel-navigation__button btn-square"
      @click="$emit('next')"
    >
      <IconChevronRight />
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
