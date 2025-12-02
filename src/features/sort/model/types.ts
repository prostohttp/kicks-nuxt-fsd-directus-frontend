export type SortProductsType =
  | ""
  | "price"
  | "-price"
  | "date_created"
  | "-date_created";

export interface SortProductTypeObject {
  label: string;
  value: SortProductsType;
}
