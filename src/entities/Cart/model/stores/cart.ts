import { getUserCartApi } from "../../api";
import type { CartType } from "../types";

export const useCartStore = defineStore("cart", () => {
  const user = useDirectusUser();
  const cart = ref<CartType | undefined>();

  const getUserCart = async () => {
    if (user.value) {
      return await getUserCartApi(user.value.id);
    } else {
      console.log("local user set user cart");
    }
  };

  return { cart, getUserCart };
});
