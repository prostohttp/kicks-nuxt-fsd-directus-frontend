import type { OptionProductType, OptionValueType } from "~/src/shared/api";

export interface ApiProductOptionType {
  id: number;
  title: string;
  type: OptionProductType;
  for_filter: string;
  is_required: boolean;
  values: OptionValueType[];
}

export interface OptionValueApi {
  id: string;
  title: string;
  option: {
    title: string;
  };
}
