import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType, type PageType } from "~/src/shared/api";

export const getPageBlocksAndSeo = (pageId: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["seo_data", "blocks.id", "blocks.item", "blocks.collection"],
    };

    return useNuxtApp().$api.getById<PageType>(CollectionType.PAGES, pageId, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
