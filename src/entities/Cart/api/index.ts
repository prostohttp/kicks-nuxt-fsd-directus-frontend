import { CollectionType } from "~/src/shared/api";
import type { CartApiType } from "./types";

export const getUserCartApi = async (id: string) => {
  try {
    const cart = await useNuxtApp().$api.getAllRaw<CartApiType>(
      CollectionType.CART,
      {
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
