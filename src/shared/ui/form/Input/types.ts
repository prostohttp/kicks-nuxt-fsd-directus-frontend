export interface InputType {
  name: string;
  placeholder: string;
  label?: string;
  error?: string
  success?: string;
  disabled?: boolean;
  theme?: "dark" | "light";
  required: boolean;
}
