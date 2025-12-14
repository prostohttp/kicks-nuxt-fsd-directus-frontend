import type { Component } from "vue";
import {
  CheckboxOption,
  RoundCheckboxOption,
  ColorOption,
  ButtonOption,
  RadioOption,
} from "~/src/entities/Option";
import type { OptionProductType } from "~/src/shared/api";

export const optionsMapper: Record<OptionProductType, Component> = {
  checkbox: CheckboxOption,
  custom_checkbox: RoundCheckboxOption,
  color: ColorOption,
  button: ButtonOption,
  radio: RadioOption,
};
