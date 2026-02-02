import { useStorage } from "@vueuse/core";
import { getUserCartApiWithProductAndOptions } from "../../api";
import { LOCAL_CART_KEY, type CartInStoreType } from "../types";

export const useCartStore = defineStore("cart", () => {
  const user = useDirectusUser();
  const cart = ref<CartInStoreType | undefined>();

  const getUserCart = async () => {
    if (user.value) {
      cart.value = await getUserCartApiWithProductAndOptions(user.value.id);;
      useStorage(LOCAL_CART_KEY, cart.value);
      return cart.value;
    }
  };

  return { cart, getUserCart };
});
