import type { ShallowRef } from "vue";
import type { LocationQuery } from "vue-router";
import type { ProductOptionWithValues } from "~/src/entities/Option";
import type { ProductDetailsType } from "~/src/entities/Product";

export const useProductOptions = (
  product: ShallowRef<ProductDetailsType | undefined>,
) => {
  const productOptionObjectWithValues = ref<ProductOptionWithValues>({});

  const productOptionIds = computed(() => {
    const optionIds = new Set<number>();
    if (product.value?.option_values.length) {
      product.value?.option_values.forEach((option) =>
        option.option_values_id
          ? optionIds.add(option.option_values_id.option.id)
          : null,
      );
    }

    return Array.from(optionIds);
  });

  const makeProductOptionObjectWithValues = () => {
    const result: ProductOptionWithValues = {};

    product.value?.option_values.forEach((value) => {
      if (value.option_values_id.option.for_filter in result) {
        result[value.option_values_id.option.for_filter]!.values[
          value.option_values_id.title
        ] = value.option_values_id.id;
      } else {
        result[value.option_values_id.option.for_filter] = {
          isRequired: value.option_values_id.option.is_required,
          isChecked: false,
          checkedValue: undefined,
          checkedId: undefined,
          values: {
            [value.option_values_id.title]: value.option_values_id.id,
          },
        };
      }
    });

    productOptionObjectWithValues.value = result;
  };

  const checkedOptionIds = computed(() =>
    Object.values(productOptionObjectWithValues.value)
      .filter((val) => val.isChecked && val.checkedId)
      .map((val) => ({ option_values_id: val.checkedId! })),
  );

  // TODO: delete this shit
  const checkRequiredOptions = (query: LocationQuery) => {
    for (const key of Object.keys(productOptionObjectWithValues.value)) {
      if (
        key in query &&
        productOptionObjectWithValues.value[key] &&
        (query[key] as string) in
          productOptionObjectWithValues.value[key].values
      ) {
        productOptionObjectWithValues.value[key].isChecked = true;
        productOptionObjectWithValues.value[key].checkedId =
          productOptionObjectWithValues.value[key].values[query[key] as string];
        productOptionObjectWithValues.value[key].checkedValue = query[
          key
        ] as string;
      } else if (
        key in query &&
        productOptionObjectWithValues.value[key] &&
        !(
          (query[key] as string) in
          productOptionObjectWithValues.value[key].values
        )
      ) {
        productOptionObjectWithValues.value[key]!.checkedId = undefined;
        productOptionObjectWithValues.value[key]!.checkedValue = undefined;
        productOptionObjectWithValues.value[key]!.isChecked = false;
      }
    }
  };

  return {
    productOptionObjectWithValues,
    productOptionIds,
    checkedOptionIds,
    makeProductOptionObjectWithValues,
    checkRequiredOptions,
  };
};
