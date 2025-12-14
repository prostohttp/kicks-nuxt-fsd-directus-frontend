import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType } from "~/src/shared/api";
import type { ApiProductOptionType } from "./types";

export const getOptionsById = (collection: CollectionType, ids: number[]) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "title,type,for_filter,is_required",
        "values.id",
        "values.title",
        "values.text",
        "values.color",
        "values.image",
      ],
      filter: {
        id: { _in: ids.join(",") },
      },
    };
    return useNuxtApp().$api.getAllRaw<ApiProductOptionType>(
      collection,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
