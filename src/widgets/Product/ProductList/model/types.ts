import type { ApiFilterType } from "~/src/shared/api";

export interface GlobalFilterType extends ApiFilterType {
  option_values: {
    option_values_id: {
      title: {
        _in?: string;
      };
    };
  };
  price: {
    _lte?: number;
  };
  label: {
    _eq?: string;
  };
  categories: {
    product_categories_id: {
      _in?: number;
    };
  };
}