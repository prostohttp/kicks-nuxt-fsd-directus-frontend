<script setup lang="ts">
import { IconCloseFlat } from "../../icons";

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <div>
    <GSAPTransition :hidden="{ top: -50, opacity: 1 }" :duration="0.15">
      <section v-if="isOpen" class="full-screen-modal">
        <IconCloseFlat
          class="full-screen-modal__close"
          @click="isOpen = !isOpen"
        />
        <div class="full-screen-modal__content">
          <slot />
        </div>
      </section>
    </GSAPTransition>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
