import type { OrderType } from "../types";

export const useOrderStore = defineStore("orders", () => {
  const order = ref<OrderType>();

  return { order };
});
