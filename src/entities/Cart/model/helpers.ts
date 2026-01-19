import { useStorage } from "@vueuse/core";

export const updataLocalStorageByKey = (key: string, value: unknown) => {
  localStorage.removeItem(key);
  useStorage(key, value);
};
