<script setup lang="ts">
import { Checkbox } from "~/src/shared/ui/form";
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
  <section class="checkbox-filter">
    <Checkbox
      v-for="(checkbox, index) in values"
      :key="checkbox.id"
      :model-value="checkboxes[index]"
      :label="checkbox.text || ''"
      :name="checkbox.text || ''"
      :disabled="activeValues ? !activeValues?.includes(checkbox.id) : false"
      class="checkbox-filter__checkbox"
      :class="{ 'checkbox-filter__checkbox-active': checkboxes[index] }"
      @change="setActiveStateHandler(checkboxes, index, isSingle)"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
