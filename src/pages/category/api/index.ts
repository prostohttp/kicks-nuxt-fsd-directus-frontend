import type { DirectusQueryParams } from "nuxt-directus";
import type { CategoryType, CollectionType } from "~/src/shared/api";
import { CollectionType as PATH } from "~/src/shared/api";
import type { ApiPriceMinMaxType } from "./types";

export const getCategory = (
  collection: CollectionType,
  slug: string | null,
) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id",
        "title",
        "slug",
        "description",
        "thumbnail",
        "seo",
        "banner.id",
        "banner.heading",
        "banner.small_heading",
        "banner.image",
        "banner.description",
        "children",
        "show_filter.options.options_id.id",
        "show_filter.options.options_id.title",
        "show_filter.options.options_id.for_filter",
        "show_filter.options.options_id.type",
        "show_filter.options.options_id.values.id",
        "show_filter.options.options_id.values.title",
        "show_filter.options.options_id.values.text",
        "show_filter.options.options_id.values.color",
        "show_filter.options.options_id.values.image",
      ],
      limit: 1,
      filter: {
        slug: slug?.toString() || "",
      },
    };
    return useNuxtApp().$api.getAllRaw<CategoryType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};

export const getMinMaxPrice = async (categoryId: number) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    return await $fetch<ApiPriceMinMaxType>(
      runtimeConfig.public.directus.url + PATH.API_PRODUCTS,
      {
        query: {
          "aggregate[min]": "price",
          "aggregate[max]": "price",
          filter: {
            categories: {
              product_categories_id: {
                _eq: categoryId,
              },
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
