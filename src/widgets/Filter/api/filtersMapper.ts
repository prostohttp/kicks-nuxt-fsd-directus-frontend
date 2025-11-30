import type { Component } from "vue";
import type { OptionType } from "~/src/shared/api";
import CheckboxFilter from "../ui/variants/CheckboxFilter/CheckboxFilter.vue";
import RoundCheckboxFilter from "../ui/variants/RoundCheckboxFilter/RoundCheckboxFilter.vue";
import ColorFilter from "../ui/variants/ColorFilter/ColorFilter.vue";
import ButtonFilter from "../ui/variants/ButtonFilter/ButtonFilter.vue";
import SliderFilter from "../ui/variants/SliderFilter/SliderFilter.vue";

export const filtersMapper: Record<OptionType, Component> = {
  checkbox: CheckboxFilter,
  custom_checkbox: RoundCheckboxFilter,
  color: ColorFilter,
  button: ButtonFilter,
  slider: SliderFilter,
};
