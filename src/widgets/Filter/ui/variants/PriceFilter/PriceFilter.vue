<script setup lang="ts">
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

import { formatUSD } from "~/src/shared/lib";
import type { ApiFilterType } from "~/src/widgets/Filter/api/types";
import { useFilterStore } from "../../../model/stores/filter";

const { queryString, categoryId } = defineProps<ApiFilterType>();
const route = useRoute();
const queryStringValue = Number(route.query[queryString]);
const filterStore = useFilterStore();

await callOnce(() => filterStore.minMaxPrice(categoryId), {
  mode: "navigation",
});
const { minPrice, maxPrice } = storeToRefs(filterStore);

const initialValue = computed(() =>
  !queryStringValue ||
  queryStringValue < minPrice.value ||
  queryStringValue > maxPrice.value
    ? minPrice.value
    : queryStringValue,
);
const price = ref(initialValue.value);
const queryValue = ref();
const debounceQueryValue = useDebounceFn(
  (value) => (queryValue.value = value),
  200,
);

watch(price, (newValue) => {
  if (newValue) {
    debounceQueryValue(newValue);
  }
});
watch(
  () => route.query[queryString],
  (newValue) => {
    if (!newValue) {
      price.value = minPrice.value;
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
      v-model="price"
      :min="minPrice"
      :max="maxPrice"
      :tooltip-formatter="formatUSD(price!)"
      :tooltip="'always'"
    />
    <div class="slider-filter__min-max">
      <span>{{ formatUSD(minPrice) }}</span>
      <span>{{ formatUSD(maxPrice) }}</span>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
