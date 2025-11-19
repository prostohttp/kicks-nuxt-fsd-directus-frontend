import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";

export const getCopyright = () => {
  try {
    const params = {
      fields: ["copyright"],
    };

    return useNuxtApp().$api.getSingleton(CollectionType.SETTINGS, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getCategories = () => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "title",
        "items.navigation_items_id.title",
        "items.navigation_items_id.type",
        "items.navigation_items_id.url",
        "items.navigation_items_id.page.permalink",
        "items.navigation_items_id.product.slug",
        "items.navigation_items_id.category.slug",
      ],
    };

    return useNuxtApp().$api.getById(CollectionType.MENUS, "3", params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getCompany = () => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "title",
        "items.navigation_items_id.title",
        "items.navigation_items_id.type",
        "items.navigation_items_id.url",
        "items.navigation_items_id.page.permalink",
        "items.navigation_items_id.product.slug",
        "items.navigation_items_id.category.slug",
      ],
    };

    return useNuxtApp().$api.getById(CollectionType.MENUS, "4", params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getDescription = () => {
  try {
    const params: DirectusQueryParams = {
      fields: ["description"],
    };

    return useNuxtApp().$api.getSingleton(CollectionType.SETTINGS, params);
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

    return useNuxtApp().$api.getSingleton(CollectionType.SETTINGS, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
