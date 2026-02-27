import type { DirectusQueryParams } from "nuxt-directus";
import {
  CollectionType,
  type ApiFilterType,
  type PageType,
} from "~/src/shared/api";
import type { CategoryType } from "./types";

export const getPage = async (permalink: string | null) => {
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
    const pages = await useNuxtApp().$api.getAllRaw<PageType>(
      CollectionType.PAGES,
      params,
    );
    return pages[0];
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getCategories = (limit?: number, filter?: ApiFilterType) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "slug", "thumbnail"],
      filter,
      limit,
    };
    return useNuxtApp().$api.getAllRaw<CategoryType>(
      CollectionType.CATEGORIES,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
