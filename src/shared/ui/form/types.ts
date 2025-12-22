export type FieldTypes =
  | "text"
  | "textarea"
  | "checkbox"
  | "radio"
  | "file"
  | "select"
  | "rating"
  | "hidden";

export interface FormTypesField {
  id: number;
  label: string;
  name: string;
  type: FieldTypes;
  help: string;
  required: boolean;
  placeholder: string;
  validation: string;
}

export interface FormTypes {
  title: string;
  id: number;
  submit_label: string;
  success_message?: string;
  success_redirect_url?: string;
  fields: FormTypesField[];
}
