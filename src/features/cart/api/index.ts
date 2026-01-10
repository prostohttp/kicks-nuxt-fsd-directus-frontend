import {
  getUserCartApi,
  type CartApiType,
  type CartProductApiType,
  type CartProductType,
  type CartType,
} from "~/src/entities/Cart";
import { CollectionType } from "~/src/shared/api";

export const saveCartApi = async (
  user_created: string,
  products: CartProductType[],
) => {
  try {
    const savedCart = await getUserCartApi(user_created);

    const savedProducts = (await useNuxtApp().$api.create<CartProductType>(
      CollectionType.CART_ITEMS,
      products,
    )) as CartProductApiType[];

    if (!savedProducts[0]) {
      throw createError({ message: "Failed create product for cart" });
    }

    if (!savedCart) {
      const createdCart = (await useNuxtApp().$api.create<CartType>(
        CollectionType.CART,
        [
          {
            user_created,
            product: [savedProducts[0].id],
          },
        ],
      )) as CartApiType[];

      return createdCart[0];
    } else {
      return await useNuxtApp().$api.update<CartApiType>(
        CollectionType.CART,
        // savedCart.id,
        user_created,
        {
          ...savedCart,
          product: [...savedCart.product, savedProducts[0].id],
        },
      );
    }
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
