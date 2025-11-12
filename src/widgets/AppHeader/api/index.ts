import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";

export const getMenu = () => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "items.navigation_items_id.title",
        "items.navigation_items_id.type",
        "items.navigation_items_id.url",
        "items.navigation_items_id.page.permalink",
        "items.navigation_items_id.product.slug",
        "items.navigation_items_id.category.slug",
        "items.navigation_items_id.children.related_navigation_items_id.title",
        "items.navigation_items_id.children.related_navigation_items_id.type",
        "items.navigation_items_id.children.related_navigation_items_id.url",
        "items.navigation_items_id.children.related_navigation_items_id.page.permalink",
        "items.navigation_items_id.children.related_navigation_items_id.category.slug",
        "items.navigation_items_id.children.related_navigation_items_id.product.slug",
      ],
    };

    return useNuxtApp().$api.getById(CollectionType.MENUS, "2", params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
