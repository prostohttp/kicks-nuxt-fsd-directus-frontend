import type { OptionValueType } from "~/src/shared/api";

export interface PropsOptionType {
  values: OptionValueType[];
  categoryId?: number;
  isSingle?: boolean;
  queryString: string;
}
