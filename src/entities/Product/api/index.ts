import type { ApiFilterType } from "~/src/shared/api";
import { CollectionType } from "~/src/shared/api";
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

export const getProduct = (collection: CollectionType, slug: string | null) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id",
        "title",
        "image",
        "seo",
        "slug",
        "description",
        "label",
        "price",
        "reviews",
        "related_products.related_products_id.id",
        "related_products.related_products_id.title",
        "related_products.related_products_id.slug",
        "related_products.related_products_id.price",
        "related_products.related_products_id.image",
        "related_products.related_products_id.label",
        "gallery.directus_files_id",
        "option_values.option_values_id",
        "option_values.option_values_id.id",
        "option_values.option_values_id.title",
        "option_values.option_values_id.option.for_filter",
        "option_values.option_values_id.option.id",
        "option_values.option_values_id.option.is_required",
      ],
      filter: {
        slug: slug?.toString() || "",
      },
    };
    return useNuxtApp().$api.getAllBySlug<ProductDetailsType>(
      collection,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getProductReviewsCount = async (productId: number) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    return await $fetch<{ data: { count: { rating: string } }[] }>(
      runtimeConfig.public.directus.url + CollectionType.API_REVIEWS,
      {
        query: {
          "aggregate[count]": "rating",
          filter: {
            product: {
              _eq: productId,
            },
          },
        },
      },
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getProductRating = async (productId: number) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    return await $fetch<{ data: { avg: { rating: string } }[] }>(
      runtimeConfig.public.directus.url + CollectionType.API_REVIEWS,
      {
        query: {
          "aggregate[avg]": "rating",
          filter: {
            product: {
              _eq: productId,
            },
          },
        },
      },
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
