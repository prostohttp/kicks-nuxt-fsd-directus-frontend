import type { DirectusQueryParams } from "nuxt-directus";
import type { ApiFilterType, CollectionType } from "~/src/shared/api";
import type { CategoryType } from "./types";

export const getCategories = (
  collection: CollectionType,
  limit: number,
  filter?: ApiFilterType,
) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "slug", "thumbnail"],
      filter,
      limit,
    };
    return useNuxtApp().$api.getAllRaw<CategoryType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
