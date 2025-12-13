import type { OptionType, OptionValueType } from "~/src/shared/api";

export interface ApiFilterType {
  values: OptionValueType[];
  categoryId: number;
  queryString: string;
}

export interface FiltersType {
  options: FilterType[];
}

export interface FilterType {
  options_id: {
    id: number;
    title: string;
    for_filter: string;
    type: OptionType;
    values: OptionValueType[];
  };
}
