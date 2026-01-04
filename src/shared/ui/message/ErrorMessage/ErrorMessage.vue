<script setup lang="ts">
import { IconCloseFlat } from "../../icons";

const { isClosable = true } = defineProps<{
  isClosable?: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <section class="error-message">
    <IconCloseFlat
      v-if="isClosable"
      class="error-message__close"
      @click="emit('close')"
    />
    <slot> Default message </slot>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
