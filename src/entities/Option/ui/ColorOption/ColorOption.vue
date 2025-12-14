<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import { IconCloseFlat } from "~/src/shared/ui/icons";
import { useWatchOptionQuery } from "../../model/useWatchOptionQuery";
import type { PropsOptionType } from "../../model/types";
import { setActiveStateHandler } from "../../model/helpers";

const { values, queryString } = defineProps<PropsOptionType>();
const colors = ref<boolean[]>([]);

useWatchOptionQuery(colors, values, queryString);
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
      @click="setActiveStateHandler(colors, index, isSingle)"
    >
      <IconCloseFlat v-show="colors[index]" />
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
