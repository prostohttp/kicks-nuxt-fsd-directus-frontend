import type { OptionValueType } from "~/src/shared/api";

export interface ApiFilterType {
  values: OptionValueType[];
  categoryId: number;
  queryString: string;
}

export interface ApiPriceMinMaxType {
  data: {
    min: {
      price: number;
    };
    max: {
      price: number;
    };
  }[];
}
