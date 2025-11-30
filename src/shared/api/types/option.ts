export interface FiltersType {
  options: FilterType[];
}

export interface FilterType {
  options_id: {
    id: number;
    title: string;
    type: OptionType;
    values: OptionValueType[];
  };
}

export interface OptionValueType {
  id: string;
  text: string | null;
  color: string | null;
  image: string | null;
}

export type OptionType =
  | "checkbox"
  | "custom_checkbox"
  | "color"
  | "slider"
  | "button";
