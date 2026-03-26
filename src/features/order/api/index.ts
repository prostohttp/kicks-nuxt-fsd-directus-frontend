import { CollectionType } from "~/src/shared/api";
import type { FastOrderSchemaType } from "../model/fastOrderSchema";

export const createFastOrderApi = (order: FastOrderSchemaType) => {
  try {
    return useNuxtApp().$api.create(CollectionType.FAST_ORDERS, [order]);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
