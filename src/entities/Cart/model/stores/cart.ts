import { useStorage } from "@vueuse/core";
import { getUserCartApi } from "../../api";
import { LOCAL_CART_KEY, type CartType } from "../types";

export const useCartStore = defineStore("cart", () => {
  const user = useDirectusUser();
  const cart = ref<CartType | undefined>();

  const getUserCart = async () => {
    if (user.value) {
      const userCart = await getUserCartApi(user.value.id);
      cart.value = userCart;
      useStorage(LOCAL_CART_KEY, cart.value);
      return cart.value;
    }
  };

  return { cart, getUserCart };
});
