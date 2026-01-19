import {
  LOCAL_CART_KEY,
  updataLocalStorageByKey,
  useCartStore,
  type CartProductApiType,
  type CartProductType,
  type CartType,
} from "~/src/entities/Cart";
import { updateCartApi, saveCartApi } from "../../api";
import { productOptionsHash } from "../helpers";

export const useActionsCartStore = defineStore("actions-cart", () => {
  const cartStore = useCartStore();

  const { cart } = storeToRefs(cartStore);

  const saveCart = async (
    savedProduct: CartProductType,
    user_created?: string,
  ) => {
    try {
      if (!savedProduct) {
        return;
      }

      if (!cart.value) {
        cart.value = {
          product: [],
        };
      }

      const productSortedOptionsHash = productOptionsHash(savedProduct);

      const productInCart = cart.value?.product.filter(
        (el) => productOptionsHash(el) === productSortedOptionsHash,
      )[0];

      let newCart: CartType | undefined;

      const newProduct = savedProduct as CartProductApiType;

      if (!productInCart) {
        if (!user_created) {
          cart.value.product.push(newProduct);
        } else {
          newCart = await saveCartApi(user_created, [savedProduct]);
          cart.value = newCart;
        }

        updataLocalStorageByKey(LOCAL_CART_KEY, cart.value);
        return;
      }

      const productInCartSortedOptionsHash = productOptionsHash(productInCart);

      if (productSortedOptionsHash !== productInCartSortedOptionsHash) {
        if (user_created) {
          newCart = await saveCartApi(user_created, [savedProduct]);
        }
        cart.value = newCart;
      } else {
        const productIndex = cart.value?.product.findIndex(
          (el) => productOptionsHash(el) === productSortedOptionsHash,
        );

        if (productIndex !== -1 && cart.value?.product[productIndex]) {
          ++cart.value.product[productIndex].count;
        }

        if (user_created) {
          await updateCartApi(cart.value);
        }
      }

      updataLocalStorageByKey(LOCAL_CART_KEY, cart.value);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw createError({
        message:
          "Invalid response from server, please send this information to us",
      });
    }
  };

  return { saveCart };
});
