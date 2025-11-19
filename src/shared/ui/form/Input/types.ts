export interface InputType {
  name: string;
  placeholder: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  theme?: "dark" | "light";
  type?: "text" | "password" | "email";
}
