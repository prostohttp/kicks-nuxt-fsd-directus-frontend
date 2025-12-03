<script setup lang="ts">
import { PiniaColadaDevtools } from "@pinia/colada-devtools";
// import { OverlayPreloader } from "./src/shared/ui/preloader";
</script>

<template>
  <NuxtRouteAnnouncer />
  <!-- :throttle="0"  -->
  <NuxtLoadingIndicator color="#ffa52f" />
  <PiniaColadaDevtools />
  <NuxtLayout>
    <NuxtPage />

    <!-- Overload preloader -->
    <!-- <ClientOnly>
      <template #fallback>
        <OverlayPreloader />
      </template>
    </ClientOnly> -->

  </NuxtLayout>
</template>
