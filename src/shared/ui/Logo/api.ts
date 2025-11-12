import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";

export const getLogo = (logo: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["url", logo],
    };

    return useNuxtApp().$api.getSingleton(CollectionType.SETTINGS, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
