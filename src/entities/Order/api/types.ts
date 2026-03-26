export type OrderStatus = "created" | "paid" | "canceled" | "done";

export interface OrderTypeApi {
  id: number;
  status: OrderStatus;
  user_created?: string;
  delivery: string;
  cart: string;
  payment: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
  email: string;
}
