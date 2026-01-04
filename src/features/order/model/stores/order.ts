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
    return await createFastOrderApi(order);
  };

  return { fastOrder, createFastOrder };
});
