import type { OptionValueType } from "~/src/shared/api";
import { toValidQueryString } from "../model/helpers";

export const useWatchFilterQuery = (
  state: globalThis.Ref<boolean[]>,
  values: OptionValueType[],
  filterQuery: string,
) => {
  const route = useRoute();

  watch(
    state,
    (newState) => {
      navigateTo({
        query: {
          ...route.query,
          [filterQuery]: toValidQueryString(values, newState),
        },
      });
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
      } else {
        state.value = [];
      }
    },
    {
      immediate: true,
    },
  );
};
