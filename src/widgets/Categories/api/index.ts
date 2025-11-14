import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType } from "~/src/shared/api";
import type { CategoryType } from "./types";

export const getCategories = (
  collection: CollectionType,
  limit: number,
  filter?: Record<string, unknown>,
) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "slug", "thumbnail"],
      filter,
      limit,
    };
    return useNuxtApp().$api.getAll<CategoryType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
