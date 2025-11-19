export type FieldType =
  | "text"
  | "textarea"
  | "checkbox"
  | "radio"
  | "file"
  | "select"
  | "hidden";

export interface FormType {
  id: number;
  submit_label: string;
  success_message?: string;
  success_redirect_url?: string;
  fields: Array<{
    id: number;
    label: string;
    name: string;
    type: FieldType;
    placeholder: string;
    validation: string;
  }>;
}
