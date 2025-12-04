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
        "gallery.directus_files_id",
        "option_values.option_values_id",
        "label",
        "price",
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
