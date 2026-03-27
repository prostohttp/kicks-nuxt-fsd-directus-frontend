import {
  getUserCartApi,
  getUserCartApiWithProductAndOptions,
  type CartProductWithoutPopulatedProductApi,
  type CartResponseTypeApi,
  type CartWithoutPopulatedProductApi,
} from "~/src/entities/Cart";
import { CollectionType } from "~/src/shared/api";

export const createCartWithProductsApi = async (
  user_created: string,
  products: CartProductWithoutPopulatedProductApi[],
): Promise<CartResponseTypeApi[]> => {
  const savedProducts =
    await useNuxtApp().$api.create<CartProductWithoutPopulatedProductApi>(
      CollectionType.CART_ITEMS,
      products,
    );

  return (await useNuxtApp().$api.create(CollectionType.CART, [
    {
      user_created,
      product: savedProducts.map((product) => product.id),
    },
  ])) as unknown as CartResponseTypeApi[];
};

export const saveCartApi = async (
  user_created: string,
  products: CartProductWithoutPopulatedProductApi[],
) => {
  try {
    const savedCart = await getUserCartApi(user_created);

    const savedProducts =
      await useNuxtApp().$api.create<CartProductWithoutPopulatedProductApi>(
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

    return await getUserCartApiWithProductAndOptions(user_created);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const updateCartApi = async (cart: CartWithoutPopulatedProductApi) => {
  try {
    const savedCart = await getUserCartApi(cart.user_created);
    let updatedCart: CartWithoutPopulatedProductApi;

    if (!savedCart) {
      const createdCart = await createCartWithProductsApi(
        cart.user_created,
        cart.product,
      );

      updatedCart =
        await useNuxtApp().$api.update<CartWithoutPopulatedProductApi>(
          CollectionType.CART,
          createdCart[0]!.id,
          cart,
        );
    } else {
      updatedCart =
        await useNuxtApp().$api.update<CartWithoutPopulatedProductApi>(
          CollectionType.CART,
          savedCart.id!,
          cart,
        );
    }
    return await getUserCartApiWithProductAndOptions(updatedCart.user_created);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
