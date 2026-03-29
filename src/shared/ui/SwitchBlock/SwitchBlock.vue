<script setup lang="ts">
import type { SwitchBlockType } from "./types";

const { id, title, description, value, activeId } =
  defineProps<SwitchBlockType>();
</script>

<template>
  <section
    class="switch-block"
    :class="{ 'switch-block--active': id === activeId }"
  >
    <div class="switch-block__left">
      <h4>{{ title }}</h4>
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="value" class="switch-block__right">
      {{ value }}
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
