import type { OrderStatus } from "../api/types";

export const LOCAL_CART_ORDER = "kicks-order";

export interface OrderType {
  id?: number;
  user_created?: string;
  status: OrderStatus;
  items?: number;
  price?: number;
  delivery: {
    id: string;
    title: string;
    price: number;
    description?: string;
  };
  cart?: string;
  payment: {
    id: string;
    title: string;
    description?: string;
  };
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  total?: number;
}
