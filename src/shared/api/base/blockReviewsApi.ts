import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "../types/collection";
import type { BlockReviewsType } from "../types/blocks";

export const getBlockReviews = (reviewsBlockId: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "heading",
        "collection",
        "limit",
        "columns",
        "button_url",
        "button_text",
      ],
    };

    return useNuxtApp().$api.getById<BlockReviewsType>(
      CollectionType.BLOCKS_REVIEWS,
      reviewsBlockId,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
