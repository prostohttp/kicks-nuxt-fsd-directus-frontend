<script setup lang="ts">
import { Checkbox } from "~/src/shared/ui/form";
import { useWatchOptionQuery } from "../../model/useWatchOptionQuery";
import type { PropsOptionType } from "../../model/types";

const { values, queryString } = defineProps<PropsOptionType>();
const checkboxes = ref<boolean[]>([]);

useWatchOptionQuery(checkboxes, values, queryString);
</script>

<template>
  <section class="checkbox-filter">
    <Checkbox
      v-for="(checkbox, index) in values"
      :key="checkbox.id"
      v-model="checkboxes[index]"
      :label="checkbox.text!"
      :name="checkbox.text!"
      class="checkbox-filter__checkbox"
      :class="{ 'checkbox-filter__checkbox-active': checkboxes[index] }"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
