import {
  getUserCartApi,
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

    const savedProducts = await useNuxtApp().$api.create<CartProductType>(
      CollectionType.CART_ITEMS,
      products,
    );

    if (!savedProducts[0]) {
      throw createError({ message: "Failed create product for cart" });
    }

    if (!savedCart) {
      await useNuxtApp().$api.create(CollectionType.CART, [
        {
          user_created,
          product: [savedProducts[0].id],
        },
      ]);
    } else {
      await useNuxtApp().$api.update(CollectionType.CART, savedCart.id!, {
        ...savedCart,
        product: [...savedCart.product, savedProducts[0].id],
      });
    }

    return await getUserCartApi(user_created);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const updateCartApi = async (cart: CartType) => {
  try {
    await useNuxtApp().$api.update(CollectionType.CART, cart.id!, cart);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
