import {
  useCartStore,
  type CartProductType,
  type CartType,
} from "~/src/entities/Cart";
import { saveCartApi } from "../../api";

export const useActionsCartStore = defineStore("actions-cart", () => {
  const cartStore = useCartStore();

  const { cart } = storeToRefs(cartStore);

  const saveCartToServer = async (
    user_created: string,
    products: CartProductType[],
  ) => {
    const newCart = await saveCartApi(user_created, products);

    cart.value = newCart;
  };

  const saveCartToClient = (data: CartType) => {
    cart.value = data;
  };

  return { saveCartToServer, saveCartToClient };
});
