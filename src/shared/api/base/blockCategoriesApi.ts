import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "../types/collection";
import type { BlockCategoryType } from "../types/blocks";

export const getBlockCategories = (categoriesBlockId: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["heading", "collection", "limit", "columns"],
    };

    return useNuxtApp().$api.getById<BlockCategoryType>(
      CollectionType.BLOCKS_CATEGORIES_CAROUSEL,
      categoriesBlockId,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
