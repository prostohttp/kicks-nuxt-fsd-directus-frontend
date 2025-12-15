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
const checkboxes = ref<boolean[]>([]);

useWatchOptionQuery(checkboxes, values, queryString);
</script>

<template>
  <section class="round-checkbox-filter">
    <Button
      v-for="(checkbox, index) in values"
      :key="checkbox.id"
      variant="fill"
      size="large"
      :disabled="activeValues ? !activeValues?.includes(checkbox.id) : false"
      class="btn-square round-checkbox-filter__checkbox"
      :class="{ 'round-checkbox-filter__checkbox-active': checkboxes[index] }"
      @click="setActiveStateHandler(checkboxes, index, isSingle)"
    >
      {{ checkbox.text }}
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
