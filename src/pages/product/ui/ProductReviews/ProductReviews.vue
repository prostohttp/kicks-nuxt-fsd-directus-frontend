<script setup lang="ts">
import { getReviews, ReviewDetails } from "~/src/entities/Review";
import { AddReviewForm } from "~/src/features/review";
import { CollectionType, getForm } from "~/src/shared/api";
import { ROUTES } from "~/src/shared/routes";
import { Button } from "~/src/shared/ui/form";
import { Preloader } from "~/src/shared/ui/preloader";

const { reviewIds, productId } = defineProps<{
  reviewIds: number[];
  productId: number;
}>();

const user = useDirectusUser();
const isOpenForm = ref(false);
const isAlwaysOpenForm = ref(true);

const FORM_ID = "2";
const { data: formBlock } = useQuery({
  key: () => ["form-add-review"],
  query: async () => await getForm(FORM_ID),
  gcTime: 3_000_000,
});

const emit = defineEmits<{
  refetch: [];
}>();

const refetchInfo = () => {
  emit("refetch");
};

const {
  data: reviews,
  isLoading,
  refetch,
} = useQuery({
  key: () => ["product-reviews", { productId, reviewIds }],
  query: async () =>
    await getReviews(CollectionType.REVIEWS, undefined, "-date_created", {
      product: { _eq: productId },
    }),
  placeholderData: (previousData) => previousData,
});

const removeOverlay = () => {
  document.body.classList.remove("overflow-hidden");
};

const buttonText = computed(() =>
  isOpenForm.value ? "Hide form" : "Leave a review",
);
</script>

<template>
  <section class="product-reviews">
    <NuxtLink v-if="!user" :to="ROUTES.auth" class="product-reviews__need-auth">
      <Button variant="fill" size="large" @click="removeOverlay">
        Please log in to write a review
      </Button>
    </NuxtLink>
    <Button
      v-else-if="reviewIds.length"
      variant="outline"
      size="large"
      class="product-reviews__add-review"
      @click="isOpenForm = !isOpenForm"
    >
      {{ buttonText }}
    </Button>
    <AddReviewForm
      v-else
      v-model="isAlwaysOpenForm"
      :form-block
      @refetch="refetch"
      @refetch-info="refetchInfo"
    />

    <div class="product-reviews__form">
      <AddReviewForm
        v-model="isOpenForm"
        :form-block
        @refetch="refetch"
        @refetch-info="refetchInfo"
      />
    </div>
    <Preloader v-if="isLoading" />
    <template v-else>
      <ReviewDetails v-for="review in reviews" :key="review.id" :review />
    </template>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
