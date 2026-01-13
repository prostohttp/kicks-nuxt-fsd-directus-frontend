import { createFastOrderApi } from "../../api";
import type { FastOrderType } from "../fastOrderSchema";

export const useOrderStore = defineStore("order", () => {
  const fastOrder = ref<FastOrderType>({
    name: "",
    email: "",
    comment: "",
    status: "inProgress",
    product: undefined,
    product_count: 1,
    options: [],
  });

  const createFastOrder = async (order: FastOrderType) => {
    try {
      return await createFastOrderApi(order);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw createError({
        message:
          "Invalid response from server, please send this information to us",
      });
    }
  };

  return { fastOrder, createFastOrder };
});
