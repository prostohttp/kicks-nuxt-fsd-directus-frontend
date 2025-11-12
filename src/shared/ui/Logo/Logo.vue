<script setup lang="ts">
import { ROUTES } from "../../routes";
import { getLogo } from "./api";
import type { LogoQueryResponse, LogoType } from "./types";

const { forDarkMode = false } = defineProps<LogoType>();
const logo = forDarkMode ? "logo_dark_mode" : "logo";
defineOptions({ inheritAttrs: false });

const { data } = useQuery({
  key: () => ["app-logo", logo],
  query: async () => (await getLogo(logo)) as Promise<LogoQueryResponse>,
});

const { getThumbnail: img } = useDirectusFiles();
</script>

<template>
  <NuxtLink v-if="data" :to="ROUTES.main" class="logo">
    <NuxtImg :src="img(data[logo])" alt="logo" v-bind="$attrs" />
  </NuxtLink>
  <NuxtLink v-else :to="ROUTES.main" class="logo">
    <NuxtImg src="/logo.svg" alt="logo" v-bind="$attrs" />
  </NuxtLink>
</template>

<style lang="scss">
@use "styles";
</style>
