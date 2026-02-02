export const LOCAL_CART_KEY = "kicks-cart";

export interface CartInStoreType {
  id?: string;
  user_created?: string;
  product: ProductCartInStoreType[];
}

export interface ProductCartInStoreType {
  id?: string;
  count: number;
  product: {
    id: number;
    title: string;
    slug: string;
    image: string;
    price: number;
  };
  options: OptionsProductCartInStoreType[];
}

export interface OptionsProductCartInStoreType {
  option_values_id: OptionValueProductCartInStoreType;
}

export interface OptionValueProductCartInStoreType {
  id: string;
  title: string;
  option: {
    title: string;
  };
}
