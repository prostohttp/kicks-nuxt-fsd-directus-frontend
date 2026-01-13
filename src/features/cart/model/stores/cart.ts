import {
  useCartStore,
  type CartProductType,
  type CartType,
} from "~/src/entities/Cart";
import { updateCartApi, saveCartApi } from "../../api";
import { productOptionsHash } from "../helpers";

export const useActionsCartStore = defineStore("actions-cart", () => {
  const cartStore = useCartStore();

  const { cart } = storeToRefs(cartStore);

  const saveCartToServer = async (
    user_created: string,
    savedProduct: CartProductType,
  ) => {
    try {
      if (!savedProduct) {
        return;
      }

      const productSortedOptionsHash = productOptionsHash(savedProduct);

      const productInCart = cart.value?.product.filter(
        (el) => productOptionsHash(el) === productSortedOptionsHash,
      )[0];

      if (!productInCart || !cart.value) {
        const newCart = await saveCartApi(user_created, [savedProduct]);
        cart.value = newCart;
        return;
      }

      const productInCartSortedOptionsHash = productOptionsHash(productInCart);

      if (productSortedOptionsHash !== productInCartSortedOptionsHash) {
        const newCart = await saveCartApi(user_created, [savedProduct]);
        cart.value = newCart;
      } else {
        const productIndex = cart.value.product.findIndex(
          (el) => productOptionsHash(el) === productSortedOptionsHash,
        );

        if (productIndex !== -1 && cart.value.product[productIndex]) {
          ++cart.value.product[productIndex].count;
        }

        await updateCartApi(cart.value);
      }
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw createError({
        message:
          "Invalid response from server, please send this information to us",
      });
    }
  };

  const saveCartToClient = (data: CartType) => {
    cart.value = data;
  };

  return { saveCartToServer, saveCartToClient };
});
