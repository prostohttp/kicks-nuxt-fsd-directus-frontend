import { CollectionType } from "~/src/shared/api";
import type { CartInStoreType } from "../model/types";
import type { CartTypeApi } from "./types";

export const getUserCartApiWithProductAndOptions = async (id: string) => {
  try {
    const fields = [
      "user_created",
      "id",
      "product.product.id",
      "product.product.title",
      "product.product.image",
      "product.product.price",
      "product.product.slug",
      "product.options.option_values_id",
      "product.options.option_values_id.id",
      "product.options.option_values_id.title",
      "product.options.option_values_id.option.title",
      "product.count",
      "product.id",
    ];

    const cart = await useNuxtApp().$api.getAllRaw<CartInStoreType>(
      CollectionType.CART,
      {
        fields,
        filter: {
          user_created: { _eq: id },
        },
      },
    );
    return cart[0];
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getUserCartApi = async (id: string) => {
  try {
    const fields = [
      "user_created",
      "id",
      "product"
    ];

    const cart = await useNuxtApp().$api.getAllRaw<CartTypeApi>(
      CollectionType.CART,
      {
        fields,
        filter: {
          user_created: { _eq: id },
        },
      },
    );
    return cart[0];
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
