import type { DirectusQueryParams } from "nuxt-directus";
import type { CollectionType } from "../types/collection";
import type { BannerType } from "../../ui/Banner";

export const getBanner = (bannerId: string, collection: CollectionType) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "banner.image",
        "banner.small_heading",
        "banner.heading",
        "banner.description",
      ],
    };

    return useNuxtApp().$api.getById<BannerType>(collection, bannerId, params);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
