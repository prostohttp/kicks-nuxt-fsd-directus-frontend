import type { OptionValueType } from "~/src/shared/api";

export const toValidQueryString = (
  values: OptionValueType[],
  state: boolean[],
): string => {
  const titles = values.map((value, index) =>
    state[index] ? value.title : null,
  );
  return titles.filter((value) => value).toString();
};
