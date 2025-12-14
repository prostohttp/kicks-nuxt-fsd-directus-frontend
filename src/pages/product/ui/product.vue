<script setup lang="ts">
import { getProduct, ProductDetails } from "~/src/entities/Product";
import { CollectionType } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/form";
import { IconHeart } from "~/src/shared/ui/icons";
import { NotFound } from "~/src/shared/ui/NotFound";
import { Preloader } from "~/src/shared/ui/preloader";
import RelatedProducts from "./RelatedProducts/RelatedProducts.vue";
import ProductOptions from "./ProductOptions/ProductOptions.vue";
import { getOptionsById } from "~/src/entities/Option";

const route = useRoute();

const productSlug = computed(() =>
  "product" in route.params ? (route.params.product as string) : null,
);
const { data, isLoading } = useQuery({
  key: () => ["product", productSlug.value],
  query: async () => getProduct(CollectionType.PRODUCTS, productSlug.value),
});

const product = computed(() => (data.value ? data.value[0] : null));

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

const { data: options } = useQuery({
  key: () => ["product-options", productOptionIds.value],
  query: async () =>
    await getOptionsById(CollectionType.OPTIONS, productOptionIds.value),
});

useSeoMeta({
  title: () => product.value?.seo.title,
  description: () => product.value?.seo.meta_description,
});

const addToCart = () => {
  console.log("Add to cart");
};

const addToFavorites = () => {
  console.log("Add to favorites");
};

const byItNow = () => {
  console.log("By it Now");
};
</script>

<template>
  <Preloader v-if="isLoading" />
  <NotFound v-else-if="!product" heading="Product not found!" />
  <section v-else class="product-page">
    <ProductDetails v-bind="product">
      <template v-if="product.option_values.length" #options>
        <ProductOptions
          :all-options="options"
          :active-options="product.option_values"
        />
      </template>
      <template #actions>
        <div class="actions">
          <Button
            variant="fill"
            size="large"
            class="actions__add-to-cart"
            @click="addToCart"
          >
            Add to cart
          </Button>
          <Button
            variant="fill"
            size="large"
            class="actions__add-to-favorites btn-square"
            @click="addToFavorites"
          >
            <IconHeart />
          </Button>
          <Button
            variant="fill"
            size="large"
            class="actions__buy-it-now"
            @click="byItNow"
          >
            Buy it now
          </Button>
        </div>
      </template>
    </ProductDetails>
    <RelatedProducts
      v-if="product.related_products.length"
      :products="product.related_products"
    />
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
