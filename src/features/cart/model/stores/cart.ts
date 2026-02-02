import {
  LOCAL_CART_KEY,
  updataLocalStorageByKey,
  useCartStore,
  type CartProductApi,
} from "~/src/entities/Cart";
import { updateCartApi, saveCartApi } from "../../api";
import {
  productOptionsHash,
  productOptionsHashFromCart,
  cartWithUnfilledOptions,
  transformOptions,
} from "../helpers";
import { useOptionStore } from "~/src/entities/Option";

export const useActionsCartStore = defineStore("actions-cart", () => {
  const cartStore = useCartStore();

  const { cart } = storeToRefs(cartStore);

  const optionStore = useOptionStore();
  const addLocalProductToCart = async (product: CartProductApi) => {
    const options = product.options.map((el) => el.option_values_id);
    const optionsApi = await optionStore.getOptionValues(options);

    cart.value?.product.push({
      ...product,
      options: optionsApi ? transformOptions(optionsApi) : [],
    });
  };

  const saveCart = async (
    savedProduct: CartProductApi,
    user_created?: string,
  ) => {
    try {
      if (!savedProduct) {
        return;
      }

      const productSortedOptionsHash = productOptionsHash(savedProduct);

      const productInCart = cart.value?.product.filter(
        (el) => productOptionsHashFromCart(el) === productSortedOptionsHash,
      )[0];

      const savedProductWithoutPopulatedProduct = {...savedProduct, product: savedProduct.product.id}

      if (!productInCart) {
        if (user_created) {
          console.log(savedProduct);

          cart.value = await saveCartApi(user_created, [savedProductWithoutPopulatedProduct]);
        } else {
          if (!cart.value) {
            cart.value = {
              product: [],
            };
          }
          await addLocalProductToCart(savedProduct);
          updataLocalStorageByKey(LOCAL_CART_KEY, cart.value);
        }
      } else {
        const productIndex = cart.value!.product.findIndex(
          (el) => productOptionsHashFromCart(el) === productSortedOptionsHash,
        );

        if (productIndex !== -1 && cart.value?.product[productIndex]) {
          ++cart.value.product[productIndex].count;
        }

        if (user_created) {
          if (cart.value) {
            console.log(cart.value);

            await updateCartApi(cartWithUnfilledOptions(cart.value));
          }
        } else {
          updataLocalStorageByKey(LOCAL_CART_KEY, cart.value);
        }
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

  return { saveCart, addLocalProductToCart };
});
