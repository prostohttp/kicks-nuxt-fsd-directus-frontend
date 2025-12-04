<script setup lang="ts">
import { ApplyFilters, ResetFilters } from "~/src/features/filter";
import type { FilterType } from "~/src/shared/api";
import { filtersMapper } from "../api/filtersMapper";
import { Dropdown } from "~/src/shared/ui/Dropdown";
import { useFilterStore } from "../model/stores/filter";

const { filters, categoryId } = defineProps<{
  filters: FilterType[];
  categoryId: number;
}>();
const emit = defineEmits<{
  apply: [];
  reset: [];
}>();
const filterStore = useFilterStore();
const { apiFilters } = storeToRefs(filterStore);
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
          :query-string="filter.for_filter"
          :values="filter.values"
          :category-id="categoryId"
          class="filters__filter__component"
        />
      </Dropdown>
    </div>
    <div v-if="isActions" class="filters__actions">
      <ResetFilters @click="emit('reset')" />
      <ApplyFilters @click="emit('apply')" />
    </div>
    {{ apiFilters }}
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
