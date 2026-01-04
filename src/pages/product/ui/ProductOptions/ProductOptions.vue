<script setup lang="ts">
import type { ApiProductOptionType } from "~/src/entities/Option";
import type { ApiProductActiveOptionType } from "~/src/shared/api";
import { optionsMapper } from "../../api/optionsMapper";

const { allOptions, activeOptions } = defineProps<{
  allOptions: ApiProductOptionType[] | undefined;
  activeOptions: ApiProductActiveOptionType[] | undefined;
}>();

const activeOptionValuesId = (id: number) => {
  return activeOptions
    ?.filter(({ option_values_id }) => option_values_id?.option.id === id)
    .map(({ option_values_id }) => option_values_id.id);
};

const resetOptions = () => {
  navigateTo({
    query: {
      undefined,
    },
  });
};
</script>

<template>
  <section class="product-options">
    <div
      v-for="option in allOptions"
      :key="option.id"
      class="product-options__option"
    >
      <h4 class="product-options__option__title">
        <span
          v-if="option.is_required"
          class="product-options__option__title--required"
        >
          *
        </span>
        {{ option.title }}
      </h4>
      <component
        :is="optionsMapper[option.type]"
        :query-string="option.for_filter"
        :values="option.values"
        :is-single="true"
        :active-values="activeOptionValuesId(option.id)"
        class="product-options__option__component"
      />
    </div>
    <div class="product-options__reset">
      <button class="product-options__reset__button" @click="resetOptions">
        Reset product variants
      </button>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
