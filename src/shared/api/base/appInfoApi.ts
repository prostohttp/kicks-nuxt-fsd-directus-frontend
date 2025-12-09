import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "../types/collection";
import type { Copyright, Description, Social } from "../types/appInfo";

export const getDescription = () => {
  try {
    const params: DirectusQueryParams = {
      fields: ["description"],
    };

    return useNuxtApp().$api.getSingleton<Description>(
      CollectionType.SETTINGS,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getSocial = () => {
  try {
    const params: DirectusQueryParams = {
      fields: ["social_links"],
    };

    return useNuxtApp().$api.getSingleton<Social>(
      CollectionType.SETTINGS,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getCopyright = () => {
  try {
    const params = {
      fields: ["copyright"],
    };

    return useNuxtApp().$api.getSingleton<Copyright>(CollectionType.SETTINGS, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
