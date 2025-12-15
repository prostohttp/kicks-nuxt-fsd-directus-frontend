<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import { useWatchOptionQuery } from "../../model/useWatchOptionQuery";
import type { PropsOptionType } from "../../model/types";
import { setActiveStateHandler } from "../../model/helpers";

const {
  values,
  queryString,
  isSingle = false,
  activeValues,
} = defineProps<PropsOptionType>();
const buttons = ref<boolean[]>([]);

useWatchOptionQuery(buttons, values, queryString);
</script>

<template>
  <section class="buttons-filter">
    <Button
      v-for="(button, index) in values"
      :key="button.id"
      variant="fill"
      size="normal"
      :disabled="activeValues ? !activeValues?.includes(button.id) : false"
      class="buttons-filter__button"
      :class="{
        'buttons-filter__button-active': buttons[index],
      }"
      @click="setActiveStateHandler(buttons, index, isSingle)"
    >
      {{ button.text }}
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
