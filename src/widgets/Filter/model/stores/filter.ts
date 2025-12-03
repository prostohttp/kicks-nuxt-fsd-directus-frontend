import type { ApiFilterType } from "~/src/shared/api";

export const useFilterStore = defineStore("filters", () => {
  const filters = ref<ApiFilterType>({});

  const addFilter = (filter: ApiFilterType): ApiFilterType => {
    return { ...filters.value, filter };
  };

  return { filters, addFilter };
});
