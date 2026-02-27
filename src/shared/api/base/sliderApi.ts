import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "../types/collection";
import type { BlockSliderType } from "../types/blocks";
import type { SliderType } from "../../ui/Slider";

export const getSlider = async (blockId: string) => {
  try {
    const nuxtApp = useNuxtApp();

    const blockParams: DirectusQueryParams = {
      fields: ["slider"],
    };
    const sliderParams: DirectusQueryParams = {
      fields: [
        "banners.id",
        "banners.image",
        "banners.preview_image",
        "banners.slide_label",
        "banners.heading",
        "banners.description",
        "banners.button_url",
        "banners.button_text",
      ],
    };

    const sliderBLock = await nuxtApp.$api.getById<BlockSliderType>(
      CollectionType.BLOCKS_HERO,
      blockId,
      blockParams,
    );

    return nuxtApp.runWithContext(
      async () =>
        await nuxtApp.$api.getById<SliderType>(
          sliderBLock.slider.collection,
          sliderBLock.slider.key,
          sliderParams,
        ),
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
