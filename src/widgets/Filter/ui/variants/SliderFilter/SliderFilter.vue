<script setup lang="ts">
// import component
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";

// import theme
import "vue-slider-component/theme/default.css";
import { formatUSD } from "~/src/shared/lib";
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";

const { values, queryString } = defineProps<ApiFilterType>();
const min = ref(100);
const max = ref(1000);
const value = ref(min.value);

</script>

<template>
  <section class="slider-filter">
    <vue-slider
      v-model="value"
      :min="min"
      :max="max"
      :tooltip-formatter="formatUSD(value)"
    />
    <div class="slider-filter__min-max">
      <span>{{ formatUSD(min) }}</span>
      <span>{{ formatUSD(max) }}</span>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
