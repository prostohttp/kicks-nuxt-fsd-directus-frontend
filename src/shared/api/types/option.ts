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

export interface OptionValueType {
  id: string;
  title: string;
  text: string | null;
  color: string | null;
  image: string | null;
}

export interface ApiProductActiveOptionType {
  option_values_id: {
    id: string;
    title: string;
    option: {
      id: number;
      for_filter: string;
      is_required: boolean;
    };
  };
}

export type OptionType =
  | "checkbox"
  | "custom_checkbox"
  | "color"
  | "slider"
  | "button";

export type OptionProductType =
  | "checkbox"
  | "custom_checkbox"
  | "color"
  | "button";
