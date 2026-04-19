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

export interface OrderWithCartTypeApi {
  id: number;
  status: OrderStatus;
  user_created: string;
  email: string;
  delivery: {
    title: string;
    price: number;
    description?: string;
  };
  payment: {
    title: string;
    description?: string;
  };
  cart: {
    id: string;
    product: {
      count: number;
      product: {
        id: number;
        title: string;
        image: string;
        price: number;
        slug: string;
      };
      options: {
        option_values_id: {
          id: string;
          title: string;
          option: {
            title: string;
          };
        };
      }[];
    }[];
  };
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
}
