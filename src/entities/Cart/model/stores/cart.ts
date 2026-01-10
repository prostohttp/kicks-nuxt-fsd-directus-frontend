import type { CartType } from "../types";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<CartType>();

  return { cart };
});
