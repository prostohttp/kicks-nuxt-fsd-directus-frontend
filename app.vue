<script setup lang="ts">
import { PiniaColadaDevtools } from "@pinia/colada-devtools";
import { Preloader } from "./src/shared/ui/Preloader";
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator :throttle="0" color="#ffa52f" />
  <PiniaColadaDevtools />
  <NuxtLayout>
    <NuxtPage />
    <!-- TODO: Первичная загрузка -->
    <ClientOnly>
      <template #fallback>
        <Preloader />
      </template>
    </ClientOnly>
  </NuxtLayout>
</template>
