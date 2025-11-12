<script lang="ts" setup>
import Button from "../../Button/Button.vue";
import { IconChevronRight } from "../../icons";

defineEmits<{
  prev: [];
  next: [];
}>();
</script>

<template>
  <section class="carousel-navigation">
    <Button
      variant="fill"
      size="normal"
      class="chevron-left carousel-navigation__button btn-square"
      @click="$emit('prev')"
    >
      <IconChevronRight />
    </Button>
    <Button
      variant="fill"
      size="normal"
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
