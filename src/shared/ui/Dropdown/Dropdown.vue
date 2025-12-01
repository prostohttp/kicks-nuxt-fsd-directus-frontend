<script setup lang="ts">
import { IconChevronDown } from "../icons";

const { heading } = defineProps<{ heading: string }>();
const isOpen = ref(true);
</script>

<template>
  <section class="dropdown">
    <div class="dropdown__heading" @click="isOpen = !isOpen">
      <span>{{ heading }}</span>
      <IconChevronDown :class="{ 'is-open': isOpen }" />
    </div>
    <div
      v-if="isOpen"
      v-gsap.onState-visible.to="{
        height: 'auto',
        opacity: 1,
        y: 0,
        duration: 0.15,
      }"
      class="dropdown__content"
      :data-visible="isOpen"
    >
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
