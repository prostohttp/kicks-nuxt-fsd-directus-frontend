import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";
import type { ApiProductOptionType, OptionValueApi } from "./types";

export const getOptionsById = (collection: CollectionType, ids: number[]) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id,title,type,for_filter,is_required",
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

export const getOptionValuesApi = (ids: string[]) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "option.title"],
      filter: {
        id: { _in: ids },
      },
    };
    return useNuxtApp().$api.getAllRaw<OptionValueApi>(
      CollectionType.OPTION_VALUES,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
