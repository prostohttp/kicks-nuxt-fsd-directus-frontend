import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType } from "~/src/shared/api";
import type { RegisterBenefitsType } from "./types";

export const getRegisterBenefits = (collection: CollectionType) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["auth_info"],
    };

    return useNuxtApp().$api.getSingleton<RegisterBenefitsType>(
      collection,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
