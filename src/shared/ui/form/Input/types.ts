export interface InputType {
  name: string;
  placeholder: string;
  info?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  theme?: "dark" | "light";
  type?: "text" | "password" | "email" | "hidden";
}
