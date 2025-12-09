import type { Component } from "vue";
import type { OptionType } from "~/src/shared/api";
import CheckboxFilter from "../ui/Filter/variants/CheckboxFilter/CheckboxFilter.vue";
import RoundCheckboxFilter from "../ui/Filter/variants/RoundCheckboxFilter/RoundCheckboxFilter.vue";
import ColorFilter from "../ui/Filter/variants/ColorFilter/ColorFilter.vue";
import ButtonFilter from "../ui/Filter/variants/ButtonFilter/ButtonFilter.vue";
import PriceFilter from "../ui/Filter/variants/PriceFilter/PriceFilter.vue";
import RadioFilter from "../ui/Filter/variants/RadioFilter/RadioFilter.vue";


export const filtersMapper: Record<OptionType, Component> = {
  checkbox: CheckboxFilter,
  custom_checkbox: RoundCheckboxFilter,
  color: ColorFilter,
  button: ButtonFilter,
  slider: PriceFilter,
  radio: RadioFilter,
};
