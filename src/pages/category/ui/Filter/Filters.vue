<script setup lang="ts">
import { Dropdown } from "~/src/shared/ui/Dropdown";
import { Button } from "~/src/shared/ui/form";
import { filtersMapper } from "../../api/filtersMapper";
import type { FilterType } from "../../model/types";

const { filters, categoryId } = defineProps<{
  filters: FilterType[];
  categoryId: number;
}>();
const emit = defineEmits<{
  apply: [];
  reset: [];
}>();

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
    <div class="filters__actions">
      <Button
        variant="outline"
        size="normal"
        style="justify-content: center"
        @click="emit('reset')"
      >
        Reset
      </Button>
      <Button
        variant="fill"
        size="normal"
        style="justify-content: center"
        @click="emit('apply')"
      >
        Apply
      </Button>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
