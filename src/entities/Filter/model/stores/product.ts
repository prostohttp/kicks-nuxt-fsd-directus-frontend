import { getMinMaxPrice } from "../../api";

export const useProductFilterStore = defineStore("product-filters", () => {
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
    minMaxPrice,
    minPrice,
    maxPrice,
  };
});
