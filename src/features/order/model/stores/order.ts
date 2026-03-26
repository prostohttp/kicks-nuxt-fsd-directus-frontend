import { useOrderStore, type OrderType } from "~/src/entities/Order";
import { createFastOrderApi } from "../../api";
import type { FastOrderSchemaType } from "../fastOrderSchema";

export const useFeatureOrderStore = defineStore("order-feature", () => {
  // TODO: refactor replace to entity order!!!
  const fastOrder = ref<FastOrderSchemaType>({
    name: "",
    email: "",
    comment: "",
    status: "inProgress",
    product: undefined,
    product_count: 1,
    options: [],
  });

  const orderStore = useOrderStore();

  const createFastOrder = async (order: FastOrderSchemaType) => {
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

  const createOrder = async (createOrder?: OrderType) => {
    orderStore.order = createOrder;
  };

  return { fastOrder, createFastOrder, createOrder };
});
