import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";
import type { PaymentApiType } from "./types";

export const getPaymentApi = () => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "description"],
    };
    return useNuxtApp().$api.getAllRaw<PaymentApiType>(
      CollectionType.PAYMENT,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
