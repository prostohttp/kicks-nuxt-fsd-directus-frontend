<script setup lang="ts">
import type { NuxtError } from "#app";
import { Button } from "./src/shared/ui/form";

useHead({
  title: "Error",
});
const { error } = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
const isServerError = computed(
  () => error && error.status && error.status >= 500,
);
</script>

<template>
  <div v-if="isServerError" class="error">
    <h1 class="error__title">
      Sorry, our site is temporarily down. We're fixing it as soon as possible.
    </h1>
  </div>
  <ClientOnly v-else>
    <NuxtLayout name="default">
      <div class="error">
        <NuxtImg src="not-found.png" width="200" />
        <p v-if="error" class="error__text">{{ error.message }}</p>
        <Button
          variant="fill"
          size="large"
          style="justify-content: center; width: 150px"
          @click="handleError"
        >
          Go to Home
        </Button>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>
