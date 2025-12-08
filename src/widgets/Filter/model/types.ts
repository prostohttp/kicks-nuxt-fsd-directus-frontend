import type { OptionValueType } from "~/src/shared/api";

export interface ApiFilterType {
  values: OptionValueType[];
  categoryId: number;
  queryString: string;
}
