import type { SortProductsType } from "../types";

export const useSortStore = defineStore("sort", () => {
  const sortQueryVariants: SortProductsType[] = [
    "",
    "price",
    "-price",
    "date_created",
    "-date_created",
  ];

  const sortSafety = ref<SortProductsType>();

  const toSortSafety = (sort: SortProductsType): SortProductsType => {
    if (sortQueryVariants.includes(sort)) {
      return sort;
    } else {
      return "";
    }
  };

  return { toSortSafety, sortSafety };
});
