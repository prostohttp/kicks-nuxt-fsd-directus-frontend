<script setup lang="ts">
import { Select, type SelectItemType } from "~/src/shared/ui/form";

const list: SelectItemType[] = reactive([
  {
    label: "Default",
    value: "",
  },
  {
    label: "Price up",
    value: "price",
  },
  {
    label: "Price down",
    value: "-price",
  },
  {
    label: "Newest",
    value: "-date_created",
  },
  {
    label: "Latest",
    value: "date_created",
  },
]);

const route = useRoute();
const initialSortValue = () => {
  const sortQuery = route.query.sort;
  if (sortQuery) {
    const sortListItem = list.find((item) => item.value === sortQuery);
    return sortListItem?.label || "Default";
  } else {
    return "Default";
  }
};
const sortValue = ref(initialSortValue());
const sortQuery = computed(() => {
  const sort = list.find((item) => item.label === sortValue.value);
  return sort?.value || "";
});

watch(sortValue, (newValue) => {
  if (newValue) {
    navigateTo({
      query: {
        ...route.query,
        sort: sortQuery.value,
      },
    });
  }
});
</script>

<template>
  <Select v-model="sortValue" :list />
</template>
