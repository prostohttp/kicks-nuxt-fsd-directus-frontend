export interface CartTypeApi {
  id?: string;
  user_created: string;
  product: CartProductApi[];
}

export interface CartProductApi {
  id?: string;
  product: {
    id: number;
    title: string;
    slug: string;
    image: string;
    price: number;
  };
  count: number;
  options: {
    option_values_id: string;
  }[];
}

export interface CartWithoutPopulatedProductApi {
  id?: string;
  user_created: string;
  product: CartProductWithoutPopulatedProductApi[];
}

export interface CartProductWithoutPopulatedProductApi {
  id?: string;
  product: number;
  count: number;
  options: {
    option_values_id: string;
  }[];
}
