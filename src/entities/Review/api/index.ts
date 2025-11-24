import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType } from "~/src/shared/api";
import type { ReviewType } from "./types";

export const getReviews = (collection: CollectionType, limit?: number) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id",
        "user_created.avatar",
        "title",
        "review",
        "rating",
        "gallery.directus_files_id",
        "product.slug",
      ],
      limit,
    };
    return useNuxtApp().$api.getAllRaw<ReviewType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getReview = (collection: CollectionType, id: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id",
        "user_created.avatar",
        "title",
        "review",
        "rating",
        "gallery.directus_files_id",
        "product.slug",
      ],
    };
    return useNuxtApp().$api.getById<ReviewType>(collection, id, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
