import { CollectionType } from "~/src/shared/api";
import type { ApiPriceMinMaxType } from "./types";

export const getMinMaxPrice = async (categoryId: number) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    return await $fetch<ApiPriceMinMaxType>(
      runtimeConfig.public.directus.url + CollectionType.API_PRODUCTS,
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
