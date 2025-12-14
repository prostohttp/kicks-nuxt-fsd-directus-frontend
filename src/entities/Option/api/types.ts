import type { OptionProductType, OptionValueType } from "~/src/shared/api";

export interface ApiProductOptionType {
  title: string;
  type: OptionProductType;
  for_filter: string;
  is_required: boolean;
  values: OptionValueType[];
}
