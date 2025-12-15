import type { OptionValueType } from "~/src/shared/api";

export interface PropsOptionType {
  values: OptionValueType[];
  queryString: string;
  categoryId?: number;
  isSingle?: boolean;
  activeValues?: string[];
}
