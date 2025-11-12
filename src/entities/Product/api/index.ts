import type { CollectionType } from "~/src/shared/api";
import type { ApiProductType } from "./types";
import type { DirectusQueryParams } from "nuxt-directus";

export const getProducts = (
  collection: CollectionType,
  limit?: number,
  filter?: Record<string, unknown>,
): Promise<ApiProductType[]> => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "slug", "image", "label", "sort", "price"],
      filter,
      limit,
    };
    return useNuxtApp().$api.getAll<ApiProductType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getProduct = (collection: CollectionType, id: number) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id",
        "title",
        "slug",
        "image",
        "description",
        "gallery",
        "label",
        "sort",
        "price",
      ],
    };
    return useNuxtApp().$api.getById<ApiProductType>(
      collection,
      id.toString(),
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
