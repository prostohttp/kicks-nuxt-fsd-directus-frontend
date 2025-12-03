import type { ApiFilterType, CollectionType } from "~/src/shared/api";
import type {
  DirectusMetaQueryParams,
  DirectusQueryParams,
} from "nuxt-directus";
import type { ProductCardType, ProductDetailsType } from "../model/types";
import type { ApiProductsCount } from "./types";

export const getProducts = (
  collection: CollectionType,
  meta: ApiProductsCount,
  limit?: number,
  filter?: ApiFilterType,
  page?: number,
  sort?: string,
) => {
  try {
    const params: DirectusMetaQueryParams = {
      fields: [
        "id",
        "title",
        "slug",
        "image",
        "label",
        "sort",
        "price",
        "option_values.option_values_id",
      ],
      filter,
      limit,
      meta,
      page,
      sort,
    };
    return useNuxtApp().$api.getAll<ProductCardType>(collection, params);
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
    return useNuxtApp().$api.getById<ProductDetailsType>(
      collection,
      id.toString(),
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
