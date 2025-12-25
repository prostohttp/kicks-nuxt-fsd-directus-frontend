<script setup lang="ts">
import { ProductDetails, useProductStore } from "~/src/entities/Product";
import { CollectionType } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/form";
import { IconHeart, IconStarFill } from "~/src/shared/ui/icons";
import { NotFound } from "~/src/shared/ui/NotFound";
import { Preloader } from "~/src/shared/ui/preloader";
import RelatedProducts from "./RelatedProducts/RelatedProducts.vue";
import ProductOptions from "./ProductOptions/ProductOptions.vue";
import { getOptionsById } from "~/src/entities/Option";
import ProductReviews from "./ProductReviews/ProductReviews.vue";
import { FullScreenModal, Modal } from "~/src/shared/ui/modal";
import { Placeholder } from "~/src/shared/ui/Placeholder";

const route = useRoute();

const productSlug = computed(() =>
  "product" in route.params ? (route.params.product as string) : null,
);

const productStore = useProductStore();

const { data: product, isLoading } = useQuery({
  key: () => ["product", productSlug.value],
  query: async () =>
    await productStore.getOneProduct(
      CollectionType.PRODUCTS,
      productSlug.value,
    ),
});

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

const {
  data: productReviewsInfo,
  isPending,
  refetch,
} = useQuery({
  key: () => [
    "product-reviews-info",
    {
      product: product.value ? product.value.id : null,
    },
  ],
  query: async () =>
    product.value
      ? await productStore.getProductReviewsInfo(product.value.id)
      : null,
});

const { data: options, isPending: optionsIsPending } = useQuery({
  key: () => ["product-options", productOptionIds.value],
  query: async () =>
    await getOptionsById(CollectionType.OPTIONS, productOptionIds.value),
});

useSeoMeta({
  title: () => product.value?.seo.title,
  description: () => product.value?.seo.meta_description,
});

const isOpenReviews = ref(false);

const isOpenByItNow = ref(false);

const byItNow = () => {
  isOpenByItNow.value = true;
  console.log("By it Now");
};

const isOpenAddToCart = ref(false);

const addToCart = () => {
  isOpenAddToCart.value = true;
  console.log("Add to cart");
};

const addToFavorites = () => {
  console.log("Add to favorites");
};

watch(
  [isOpenReviews, isOpenAddToCart, isOpenByItNow],
  ([newValue1, newValue2, newValue3]) => {
    if (newValue1 || newValue2 || newValue3) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  },
);

const productRating = computed(
  () => Math.round(Number(productReviewsInfo.value?.rating) * 10) / 10,
);
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else-if="product" class="product-page">
    <ProductDetails v-bind="product">
      <template #reviews>
        <Placeholder v-if="isPending" h="32px" w="200px" />
        <div v-else class="product-page__reviews">
          <button
            class="product-page__reviews__trigger"
            @click="isOpenReviews = !isOpenReviews"
          >
            Reviews ({{ productReviewsInfo?.count }})
          </button>
          <div class="product-page__reviews__rating">
            <IconStarFill />
            <span class="product-page__reviews__rating__number">
              {{ productRating }}
            </span>
          </div>
        </div>
      </template>
      <template v-if="product.option_values.length" #options>
        <Placeholder v-if="optionsIsPending" h="50px" w="300px" />
        <ProductOptions
          v-else
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
    <Teleport to="#teleports">
      <FullScreenModal v-model="isOpenReviews">
        <ProductReviews
          :review-ids="product.reviews"
          :product-id="product.id"
          @refetch="refetch"
        />
      </FullScreenModal>
    </Teleport>
    <Teleport to="#teleports">
      <Modal v-model="isOpenByItNow" title="By It Now">

      </Modal>
    </Teleport>
    <RelatedProducts
      v-if="product.related_products.length"
      :products="product.related_products"
    />
  </section>
  <NotFound v-else heading="Product not found!" />
</template>

<style lang="scss">
@use "styles";
</style>
