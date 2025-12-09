<script setup lang="ts">
import { Button } from "~/src/shared/ui/form";
import { useWatchFilterQuery } from "../../useWatchFilterQuery";
import type { ApiFilterType } from "~/src/pages/category/model/types";

const { values, queryString } = defineProps<ApiFilterType>();
const checkboxes = ref<boolean[]>([]);

useWatchFilterQuery(checkboxes, values, queryString);
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
      @click="checkboxes[index] = !checkboxes[index]"
    >
      {{ checkbox.text }}
    </Button>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
