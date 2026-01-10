export interface CartProductApiType {
  id: string;
  user_created: string;
  count: number;
  product: number;
  options: {
    option_values_id: string;
  }[];
}

export interface CartApiType {
  id: string;
  user_created: string;
  product: string[];
}
