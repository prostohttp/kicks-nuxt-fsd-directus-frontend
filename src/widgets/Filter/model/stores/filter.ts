import { getMinMaxPrice } from "../../api";
import type { OptionValuesFilterType } from "../types";

export const useFilterStore = defineStore("filters", () => {
  const apiFilters = ref<OptionValuesFilterType>({
    option_values: {
      option_values_id: {
        _in: "",
      },
    },
    price: {
      _lte: 0,
    },
  });

  const addOptionValue = (value: string) => {
    if (apiFilters.value) {
      const stringToArray =
        apiFilters.value.option_values.option_values_id._in.split(",");
      stringToArray.push(value);
      apiFilters.value.option_values.option_values_id._in =
        stringToArray.join(",");
    }
  };

  const removeOptionValue = (value: string) => {
    // TODO: !!!
    return value;
  };

  const addPrice = (price: number) => {
    if (apiFilters.value) {
      apiFilters.value.price._lte = price;
    }
  };

  const minPrice = ref();
  const maxPrice = ref();

  const minMaxPrice = async (categoryId: number) => {
    const minMaxPrice = await getMinMaxPrice(categoryId);
    if (minMaxPrice.data[0]) {
      minPrice.value = minMaxPrice.data[0].min.price;
      maxPrice.value = minMaxPrice.data[0].max.price;
    }
  };

  return {
    apiFilters,
    addOptionValue,
    removeOptionValue,
    addPrice,
    minMaxPrice,
    minPrice,
    maxPrice,
  };
});
