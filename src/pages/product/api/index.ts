import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType, ProductType } from "~/src/shared/api";

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
        "related_products",
        "label",
        "price",
        "rating",
      ],
      filter: {
        slug: slug?.toString() || "",
      },
    };
    return useNuxtApp().$api.getAllBySlug<ProductType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
