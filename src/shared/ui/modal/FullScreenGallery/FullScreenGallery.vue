<script setup lang="ts">
import { IconCloseFlat } from "../../icons";

const { images } = defineProps<{ images: string[] }>();
const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <GSAPTransition :hidden="{ top: '-50px', opacity: 1 }" :duration="0.15">
    <section v-if="isOpen" class="full-screen-modal">
      <IconCloseFlat
        class="full-screen-modal__close"
        @click="isOpen = !isOpen"
      />
      <div class="full-screen-modal__content">
        <div
          v-for="image in images"
          :key="image"
          class="full-screen-modal__content__image"
        >
          <NuxtImg
            provider="directus"
            format="webp"
            :src="image"
            @click="isOpen = !isOpen"
          />
        </div>
      </div>
    </section>
  </GSAPTransition>
</template>

<style lang="scss">
@use "styles";
</style>
