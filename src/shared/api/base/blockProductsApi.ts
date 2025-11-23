import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "../types/collection";
import type { BlockProductType } from "../types/blocks";

export const getBlockProducts = (productsBlockId: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "heading",
        "button_url",
        "is_carousel",
        "limit",
        "columns",
        "button_text",
        "paginatable",
        "sortable",
        "collection",
        "label",
      ],
    };

    return useNuxtApp().$api.getById<BlockProductType>(
      CollectionType.BLOCKS_PRODUCTS_GRID,
      productsBlockId,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
