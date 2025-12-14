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

export const setActiveStateHandler = (state: boolean[], index: number, isSingle = false) => {
  if (isSingle) {
    state[index] = !state[index];
    state.forEach((_, idx) => (idx !== index ? (state[idx] = false) : null));
  } else {
    state[index] = !state[index];
  }
};
