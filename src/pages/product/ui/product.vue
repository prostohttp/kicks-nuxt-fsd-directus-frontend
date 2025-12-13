<script setup lang="ts">
import { getProduct, ProductDetails } from "~/src/entities/Product";
import { CollectionType } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/form";
import { IconHeart } from "~/src/shared/ui/icons";
import { NotFound } from "~/src/shared/ui/NotFound";
import { Preloader } from "~/src/shared/ui/preloader";
import RelatedProducts from "./RelatedProducts/RelatedProducts.vue";

const route = useRoute();

const productSlug = computed(() =>
  "product" in route.params ? (route.params.product as string) : null,
);
const { data, isLoading } = useQuery({
  key: () => ["product", productSlug.value],
  query: async () => getProduct(CollectionType.PRODUCTS, productSlug.value),
});

const product = computed(() => (data.value ? data.value[0] : null));

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
        <Button variant="fill" size="large" class="actions__buy-it-now" @click="byItNow">
          Buy it now
        </Button>
      </div>
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
