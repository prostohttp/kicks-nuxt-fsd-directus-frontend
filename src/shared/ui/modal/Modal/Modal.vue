<script setup lang="ts">
import { IconCloseFlat } from "../../icons";

const isOpen = defineModel<boolean>({ required: true });
const { title } = defineProps<{
  title: string;
}>();
</script>

<template>
  <div>
    <div v-if="isOpen" class="modal-backdrop" @click="isOpen = !isOpen"></div>
    <GSAPTransition :hidden="{ top: -50, opacity: 1 }" :duration="0.15">
      <section v-if="isOpen" class="modal">
        <div class="modal__header">
          <h4>{{ title }}</h4>
          <IconCloseFlat
            class="modal__header__close"
            @click="isOpen = !isOpen"
          />
        </div>
        <div class="modal__content">
          <slot />
        </div>
      </section>
    </GSAPTransition>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
