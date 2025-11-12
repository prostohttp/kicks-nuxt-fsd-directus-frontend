import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "~/src/shared/api";

export const getBlockSlider = (sliderBlockId: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["slider"],
    };

    return useNuxtApp().$api.getById(
      CollectionType.BLOCKS_HERO,
      sliderBlockId,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
