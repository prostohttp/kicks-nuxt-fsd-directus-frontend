<script setup lang="ts">
import type { NuxtError } from "#app";

useHead({
  title: "Error",
});
const { error } = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
const isServerError = computed(() => error && error.statusCode >= 500);
</script>

<template>
  <div v-if="isServerError" class="error">
    <h1 class="error__title">
      Sorry, our site is temporarily down. We're fixing it as soon as possible.
    </h1>
  </div>
  <ClientOnly v-else>
    <NuxtLayout name="default" >
      <div class="error">
        <h1 class="error__title">{{ error?.statusCode }}</h1>
        <p class="error__text">{{ error?.statusMessage }}</p>
        <button class="error__button" @click="handleError">Go to Home Page</button>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>
