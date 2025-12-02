<script setup lang="ts">
import { Checkbox } from "~/src/shared/ui/form";
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";

const { values, queryString } = defineProps<ApiFilterType>();
const checkboxes = ref<boolean[]>(values.map(() => false));
</script>

<template>
  <section class="checkbox-filter">
    <Checkbox
      v-for="(checkbox, index) in values"
      :key="checkbox.id"
      v-model="checkboxes[index]!"
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
