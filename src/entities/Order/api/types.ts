export type OrderStatus = "created" | "paid" | "canceled" | "done";

export interface OrderTypeApi {
  id: number;
  status: OrderStatus;
  user_created: string;
  email: string;
  delivery: string;
  payment: string;
  cart: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
}
