<script setup lang="ts">
import { ApplyFilters, ResetFilters } from "~/src/features/filter";
import type { FilterType } from "~/src/shared/api";
import { filtersMapper } from "../api/filtersMapper";

const { filters } = defineProps<{
  filters: FilterType[];
}>();
</script>

<template>
  <section class="filters">
    <div
      v-for="{ options_id: filter } in filters"
      :key="filter.id"
      class="filters__filter"
    >
      <h4 class="filters__filter__title">{{ filter.title }}</h4>
      <component
        :is="filtersMapper[filter.type]"
        :values="filter.values"
        class="filters__filter__component"
      />
    </div>
    <div class="filter__actions">
      <ApplyFilters />
      <ResetFilters />
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
