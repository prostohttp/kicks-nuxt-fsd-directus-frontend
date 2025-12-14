<script setup lang="ts">
import type { ApiProductOptionType } from "~/src/entities/Option";
import type { ApiProductActiveOptionType } from "~/src/shared/api";
import { optionsMapper } from "../../api/optionsMapper";

const { allOptions, activeOptions } = defineProps<{
  allOptions: ApiProductOptionType[] | undefined;
  activeOptions: ApiProductActiveOptionType[] | undefined;
}>();
</script>

<template>
  <section class="product-options">
    <div
      v-for="option in allOptions"
      :key="option.for_filter"
      class="product-options__option"
    >
      <h4 class="product-options__option__title">
        {{ option.title }}
        <span
          v-if="option.is_required"
          class="product-options__option__title--required"
        >
          *
        </span>
      </h4>
      <component
        :is="optionsMapper[option.type]"
        :query-string="option.for_filter"
        :values="option.values"
        :is-single="true"
        class="product-options__option__component"
      />
    </div>
    <pre>{{ activeOptions }}</pre>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
