import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";
import type { ShippingApiType } from "./types";

export const getShippingApi = () => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "description", "price"],
    };
    return useNuxtApp().$api.getAllRaw<ShippingApiType>(
      CollectionType.SHIPPING,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
