import { getOptionValuesApi } from "../../api";

export const useOptionStore = defineStore("options", () => {
  const getOptionValues = (ids?: string[]) => {
    if (ids && ids.length) {
      return getOptionValuesApi(ids);
    }
  };

  return {
    getOptionValues,
  };
});
