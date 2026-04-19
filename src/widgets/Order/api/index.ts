import type { DirectusQueryParams } from "nuxt-directus";
import type { OrderWithCartTypeApi } from "~/src/entities/Order";
import { CollectionType } from "~/src/shared/api";

export const getUserOrdersApi = async (user_created: string) => {
  try {
    const params: DirectusQueryParams = {
      fields: [
        "id",
        "date_created",
        "status",
        "email",
        "delivery.title",
        "delivery.price",
        "delivery.description",
        "payment.title",
        "payment.description",
        "cart.id",
        "cart.product.count",
        "cart.product.product.id",
        "cart.product.product.title",
        "cart.product.product.image",
        "cart.product.product.price",
        "cart.product.product.slug",
        "cart.product.options.option_values_id",
        "cart.product.options.option_values_id.id",
        "cart.product.options.option_values_id.title",
        "cart.product.options.option_values_id.option.title",
        "first_name",
        "last_name",
        "address",
        "phone",
      ],
      filter: {
        user_created: { _eq: user_created },
      },
      sort: "-date_created",
    };

    const categories = await useNuxtApp().$api.getAllRaw<OrderWithCartTypeApi>(
      CollectionType.ORDERS,
      params,
    );

    return categories;
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
