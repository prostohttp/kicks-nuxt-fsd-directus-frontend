import type { OptionValueType } from "~/src/shared/api";
import { toValidQueryString } from "./helpers";

export const useWatchOptionQuery = (
  state: globalThis.Ref<boolean[]>,
  values: OptionValueType[],
  queryString: string,
) => {
  const route = useRoute();

  watch(
    state,
    (newState) => {
      navigateTo({
        query: {
          ...route.query,
          [queryString]: toValidQueryString(values, newState),
        },
      });
    },
    { deep: true },
  );
  watch(
    () => route.query[queryString],
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
