import type { Component } from "vue";
import {
  CheckboxOption,
  RoundCheckboxOption,
  ColorOption,
  ButtonOption,
} from "~/src/entities/Option";
import PriceFilter from "../ui/Filter/variants/PriceFilter/PriceFilter.vue";
import type { OptionType } from "~/src/shared/api";

export const filtersMapper: Record<OptionType, Component> = {
  checkbox: CheckboxOption,
  custom_checkbox: RoundCheckboxOption,
  color: ColorOption,
  button: ButtonOption,
  slider: PriceFilter,
};
