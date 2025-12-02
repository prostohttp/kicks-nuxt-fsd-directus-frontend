<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";

const { values, queryString } = defineProps<ApiFilterType>();
const checkboxes = ref<boolean[]>([]);
</script>

<template>
  <section class="round-checkbox-filter">
    <Button
      v-for="(checkbox, index) in values"
      :key="checkbox.id"
      variant="fill"
      size="large"
      class="btn-square round-checkbox-filter__checkbox"
      :class="{ 'round-checkbox-filter__checkbox-active': checkboxes[index] }"
      :disabled="index === 2"
      @click="checkboxes[index] = !checkboxes[index]"
    >
      {{ checkbox.text }}
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
