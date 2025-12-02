import type { ApiFilterType } from "~/src/shared/api";

export const useFilterStore = defineStore("filters", () => {
  const filter = ref<ApiFilterType>({});

  return { filter };
});
