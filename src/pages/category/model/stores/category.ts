import { getCategoryApi } from "../../api";

export const useCategoryStore = defineStore("categories", () => {
  const getCategory = async (slug: string | null) => {
    return await getCategoryApi(slug);
  };

  return {
    getCategory,
  };
});
