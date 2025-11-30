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
        "banner.id",
        "banner.heading",
        "banner.small_heading",
        "banner.image",
        "banner.description",
        "children",
        "show_filter.options.options_id.id",
        "show_filter.options.options_id.title",
        "show_filter.options.options_id.type",
        "show_filter.options.options_id.values.id",
        "show_filter.options.options_id.values.text",
        "show_filter.options.options_id.values.color",
        "show_filter.options.options_id.values.image",
      ],
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
