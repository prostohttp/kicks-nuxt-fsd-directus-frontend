import type { DirectusQueryParams } from "nuxt-directus";
import type { FormTypes } from ".";
import { CollectionType } from "../../api/types/collection";

export const getForm = (formId: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id",
        "title",
        "submit_label",
        "success_message",
        "fields.id",
        "fields.label",
        "fields.placeholder",
        "fields.type",
        "fields.name",
        "fields.validation",
        "fields.help",
        "fields.required",
      ],
    };

    return useNuxtApp().$api.getById<FormTypes>(
      CollectionType.FORMS,
      formId,
      params,
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
