<script setup lang="ts">
// import component
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
// import theme
import "vue-slider-component/theme/default.css";
import { formatUSD } from "~/src/shared/lib";
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";

const { queryString } = defineProps<ApiFilterType>();
const min = ref(100);
const max = ref(1000);
const route = useRoute();
const queryStringValue = Number(route.query[queryString]);
const initialValue = computed(() =>
  queryStringValue > max.value ||
  queryStringValue < min.value ||
  !queryStringValue
    ? min.value
    : queryStringValue,
);
const value = ref(initialValue.value);
const queryValue = ref();
const debounceQueryValue = useDebounceFn(
  (value) => (queryValue.value = value),
  200,
);
watch(value, (newValue) => {
  if (newValue) {
    debounceQueryValue(newValue);
  }
});
watch(
  () => route.query[queryString],
  (newValue) => {
    if (!newValue) {
      value.value = min.value;
    }
  },
);
watch(queryValue, (newValue) => {
  if (newValue) {
    navigateTo({
      query: {
        ...route.query,
        [queryString]: newValue,
      },
    });
  }
});
</script>

<template>
  <section class="slider-filter">
    <vue-slider
      v-model="value"
      :min="min"
      :max="max"
      :tooltip-formatter="formatUSD(value)"
      :tooltip="'always'"
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
