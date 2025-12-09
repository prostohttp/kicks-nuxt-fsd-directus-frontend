import type { DirectusQueryParams } from "nuxt-directus";
import type { ApiFilterType, CollectionType, PageType } from "~/src/shared/api";
import type { CategoryType } from "./types";

export const getPage = (
  collection: CollectionType,
  permalink: string | null,
) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "permalink",
        "seo_data",
        "id",
        "blocks.id",
        "blocks.item",
        "blocks.collection",
      ],
      filter: {
        permalink: permalink?.toString() || "",
      },
    };
    return useNuxtApp().$api.getAllRaw<PageType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getCategories = (
  collection: CollectionType,
  limit?: number,
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
