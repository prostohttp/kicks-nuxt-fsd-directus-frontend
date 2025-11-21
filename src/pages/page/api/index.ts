import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType, PageType } from "~/src/shared/api";

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
        permalink : permalink?.toString() || "",
      },
    };
    return useNuxtApp().$api.getAll<PageType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
