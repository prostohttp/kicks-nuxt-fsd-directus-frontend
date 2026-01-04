import type { OptionValueType } from "~/src/shared/api";

export interface PropsOptionType {
  values: OptionValueType[];
  queryString: string;
  categoryId?: number;
  isSingle?: boolean;
  activeValues?: string[];
}

export interface ProductOptionWithValues {
  [key: string]: {
    isChecked?: boolean;
    isRequired: boolean;
    checkedValue?: string;
    checkedId?: string;
    values: {
      // title: id
      [key: string]: string;
    };
  };
}
