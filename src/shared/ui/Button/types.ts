export interface ButtonType {
  variant: "fill" | "outline" | "transparent";
  size: "small" | "normal" | "large" | "square";
  disabled?: boolean;
  type?: "button" | "submit";
}
