<script setup lang="ts">
import { ApplyFilters, ResetFilters } from "~/src/features/filter";
import type { FilterType } from "~/src/shared/api";
import { filtersMapper } from "../api/filtersMapper";
import { Dropdown } from "~/src/shared/ui/Dropdown";

const { filters } = defineProps<{
  filters: FilterType[];
}>();
const emit = defineEmits<{
  close: [];
}>();
const isActions = computed(() => true);
</script>

<template>
  <section class="filters">
    <div
      v-for="{ options_id: filter } in filters"
      :key="filter.id"
      class="filters__filter"
    >
      <Dropdown :heading="filter.title" style="margin-bottom: 24px">
        <component
          :is="filtersMapper[filter.type]"
          :values="filter.values"
          class="filters__filter__component"
        />
      </Dropdown>
    </div>
    <div v-if="isActions" class="filters__actions">
      <ResetFilters @click="emit('close')" />
      <ApplyFilters @click="emit('close')" />
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
