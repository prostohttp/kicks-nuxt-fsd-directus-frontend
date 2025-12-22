export interface TextareaType {
  name: string;
  placeholder: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  theme?: "dark" | "light";
  required?: boolean;
}
