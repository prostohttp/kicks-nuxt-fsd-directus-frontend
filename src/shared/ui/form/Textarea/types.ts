export interface TextareaType {
  name: string;
  placeholder: string;
  info?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  theme?: "dark" | "light";
  required?: boolean;
}
