import type { BlockProductType } from "~/src/shared/api";
import type { GlobalFilterType } from "./types";

export const makeQueryFilter = (
  settings: BlockProductType,
  options?: string[],
) => {
  const route = useRoute();
  const filter: GlobalFilterType = {
    option_values: {
      option_values_id: {
        title: {},
      },
    },
    price: {},
    label: {},
    categories: {
      product_categories_id: {},
    },
  };

  if (settings.label) {
    filter.label = {
      _eq: settings.label,
    };
  }

  if (settings.id) {
    filter.categories.product_categories_id = {
      _in: settings.id,
    };
  }

  if (options && options.length) {
    const titles: string[] = [];
    options.forEach((option) => {
      if (option in route.query) {
        if (option === "price") {
          filter.price._lte = Number(route.query[option]);
        } else {
          if (route.query[option]?.length) {
            titles.push(route.query[option] as string);
          }
        }
      }
    });
    if (titles.length) {
      filter.option_values.option_values_id.title._in = titles
        .filter((val) => val)
        .join(",");
    } else {
      filter.option_values.option_values_id.title._in = undefined;
    }
  }

  return filter;
};