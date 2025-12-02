<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import { IconCloseFlat } from "~/src/shared/ui/icons";
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";

const { values, queryString } = defineProps<ApiFilterType>();
const colors = ref<boolean[]>([]);
</script>

<template>
  <section class="color-filter">
    <Button
      v-for="(color, index) in values"
      :key="color.id"
      variant="fill"
      size="large"
      class="btn-square color-filter__color"
      :class="{ 'color-filter__color-active': colors[index] }"
      :style="{ 'background-color': color.color }"
      :disabled="index === 2"
      @click="colors[index] = !colors[index]"
    >
      <IconCloseFlat v-show="colors[index]" />
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
