<script setup lang="ts">
import {
  FastOrderProductCard,
  ProductDetails,
  useProductStore,
} from "~/src/entities/Product";
import { CollectionType } from "~/src/shared/api";
import { Button } from "~/src/shared/ui/form";
import { IconStarFill } from "~/src/shared/ui/icons";
import { NotFound } from "~/src/shared/ui/NotFound";
import { Preloader } from "~/src/shared/ui/preloader";
import RelatedProducts from "./RelatedProducts/RelatedProducts.vue";
import ProductOptions from "./ProductOptions/ProductOptions.vue";
import {
  getOptionsById,
  type ProductOptionWithValues,
} from "~/src/entities/Option";
import ProductReviews from "./ProductReviews/ProductReviews.vue";
import { FullScreenModal, Modal } from "~/src/shared/ui/modal";
import { Placeholder } from "~/src/shared/ui/Placeholder";
import { AddToCart } from "~/src/features/cart";
import { AddToFavorites } from "~/src/features/favorites";
import { FastOrderForm } from "~/src/features/order";
import { ErrorMessage } from "~/src/shared/ui/message";

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

const productOptionObjectWithValues = ref<ProductOptionWithValues>({});

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

const checkedOptionObject = computed(() =>
  Object.keys(productOptionObjectWithValues.value)
    .filter((key) => productOptionObjectWithValues.value[key]?.isChecked)
    .map((key) => ({
      [key]: productOptionObjectWithValues.value[key]?.checkedValue,
    })),
);

const checkRequiredOptions = () => {
  for (const key of Object.keys(productOptionObjectWithValues.value)) {
    if (
      key in route.query &&
      productOptionObjectWithValues.value[key] &&
      (route.query[key] as string) in
        productOptionObjectWithValues.value[key].values
    ) {
      productOptionObjectWithValues.value[key].isChecked = true;
      productOptionObjectWithValues.value[key].checkedId =
        productOptionObjectWithValues.value[key].values[
          route.query[key] as string
        ];
      productOptionObjectWithValues.value[key].checkedValue = route.query[
        key
      ] as string;
    } else if (
      key in route.query &&
      productOptionObjectWithValues.value[key] &&
      !(
        (route.query[key] as string) in
        productOptionObjectWithValues.value[key].values
      )
    ) {
      productOptionObjectWithValues.value[key]!.checkedId = undefined;
      productOptionObjectWithValues.value[key]!.checkedValue = undefined;
      productOptionObjectWithValues.value[key]!.isChecked = false;
    }
  }
};

const isOpenReviews = ref(false);

const isOpenByItNow = ref(false);

const isValidForOrder = computed(() =>
  Object.values(productOptionObjectWithValues.value)
    .filter((val) => val.isRequired)
    .every((val) => val.isChecked),
);

const validForOrderErrorMessage = ref("");

const byItNow = () => {
  makeProductOptionObjectWithValues();
  checkRequiredOptions();

  if (isValidForOrder.value) {
    validForOrderErrorMessage.value = "";
    isOpenByItNow.value = !isOpenByItNow.value;
  } else {
    validForOrderErrorMessage.value =
      "* Please select all required options for this product.";
  }
};

const isOpenAddToCart = ref(false);

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

const productCount = ref(1);
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
          <AddToCart
            v-model="isOpenAddToCart"
            :is-valid="isValidForOrder"
            class="actions__add-to-cart"
            :disabled="optionsIsPending"
          />
          <AddToFavorites class="actions__add-to-favorites btn-square" />
          <Button
            variant="fill"
            size="large"
            class="actions__buy-it-now"
            :disabled="optionsIsPending"
            @click="byItNow"
          >
            Buy it now
          </Button>
          <GSAPTransition :hidden="{ alpha: 0 }" :duration="0.15">
            <ErrorMessage
              v-if="validForOrderErrorMessage"
              :is-closable="false"
              class="actions__error-message"
              :data-visible="validForOrderErrorMessage"
            >
              {{ validForOrderErrorMessage }}
            </ErrorMessage>
          </GSAPTransition>
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
        <FastOrderProductCard
          :id="product.id"
          v-model.number="productCount"
          :title="product.title"
          :image="product.image"
          :price="product.price"
          :options="checkedOptionObject"
        />
        <FastOrderForm
          :option-ids="checkedOptionIds"
          :count="productCount"
          :product-id="product.id"
        />
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
