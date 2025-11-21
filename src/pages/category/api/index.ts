import type { DirectusQueryParams } from "nuxt-directus";
import type { CategoryType, CollectionType } from "~/src/shared/api";

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
        "banner",
        "products",
        "children",
      ],
      filter: {
        slug: slug?.toString() || "",
      },
    };
    return useNuxtApp().$api.getAll<CategoryType>(collection, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
