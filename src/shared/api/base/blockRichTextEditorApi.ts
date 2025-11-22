import type { DirectusQueryParams } from "nuxt-directus";
import { CollectionType } from "../types/collection";
import type { BlockRichTextEditorType } from "../types/blocks";

export const getBlockRichTextEditor = (richTextEditorBlockId: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: ["id", "title", "text"],
    };

    return useNuxtApp().$api.getById<BlockRichTextEditorType>(
      CollectionType.BLOCKS_RICH_TEXT_EDITOR,
      richTextEditorBlockId,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
