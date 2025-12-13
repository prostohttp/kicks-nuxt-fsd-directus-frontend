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
    <GSAPTransition :hidden="{ height: 0, alpha: 0 }" :duration="0.15">
      <div v-if="isOpen" class="dropdown__content">
        <slot />
      </div>
    </GSAPTransition>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
