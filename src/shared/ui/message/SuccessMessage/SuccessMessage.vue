<script setup lang="ts">
import { IconCloseFlat } from "../../icons";

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <section class="success-message">
    <IconCloseFlat class="success-message__close" @click="emit('close')" />
    <slot> Default message </slot>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
