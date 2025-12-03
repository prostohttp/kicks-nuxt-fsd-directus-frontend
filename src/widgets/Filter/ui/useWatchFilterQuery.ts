import type { OptionValueType } from "~/src/shared/api";
import { toValidQueryString } from "../api/helpers";

export const useWatchFilterQuery = (
  state: globalThis.Ref<boolean[]>,
  values: OptionValueType[],
  filterQuery: string,
) => {
  const route = useRoute();

  watch(
    state,
    (newValue) => {
      if (newValue) {
        navigateTo({
          query: {
            ...route.query,
            [filterQuery]: toValidQueryString(values, state.value),
          },
        });
      }
    },
    { deep: true },
  );
  watch(
    () => route.query[filterQuery],
    (value) => {
      if (value) {
        const filter = value.toString().split(",");
        values.forEach((value, index) => {
          if (filter.includes(value.title)) {
            state.value[index] = true;
          }
        });
      }
    },
    {
      immediate: true,
    },
  );
  watch(
    () => route.query[filterQuery],
    (value) => {
      if (!value) {
        state.value = [];
      }
    },
  );
};
