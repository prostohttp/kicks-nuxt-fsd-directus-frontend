<script setup lang="ts">
import {
  Button,
  Input,
  Textarea,
  UploadFiles,
  type FormTypes,
} from "~/src/shared/ui/form";
import { MediumHeading } from "~/src/shared/ui/heading";
import { StarRating } from "~/src/shared/ui/StarRating";
import { AddReview } from "../../model/addReviewSchema";
import { useProductStore } from "~/src/entities/Product";
import { useReviewStore } from "../../model/stores/review";
import { IconFieldError } from "~/src/shared/ui/icons";

const isOpenForm = defineModel<boolean>({ required: true });

const emit = defineEmits<{
  refetch: [];
  refetchInfo: [];
}>();

interface ErrorMessages {
  [key: number]: string;
}

const errorMessages = ref<ErrorMessages>();

const errorMessage = (index: number) => {
  if (errorMessages.value && index in errorMessages.value) {
    return errorMessages.value[index];
  } else {
    return undefined;
  }
};

const successMessage = ref();

const clearSuccessMessage = () => (successMessage.value = "");

let clearSuccessMessageTimeout: NodeJS.Timeout;

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const form = reactive({
  title: "",
  review: "",
  rating: 1,
  images: [],
  product: product.value?.id,
});

const exposeRef = ref();

const resetForm = () => {
  form.title = "";
  form.review = "";
  form.rating = 1;
  form.images = [];

  exposeRef.value[0].clearInputFiles();
};

const { formBlock } = defineProps<{
  formBlock: FormTypes | undefined;
}>();

const reviewStore = useReviewStore();

const {
  mutate: addReview,
  error,
  asyncStatus,
} = useMutation({
  mutation: async (value: {
    title: string;
    review: string;
    rating: number;
    images: File[];
    product: number | undefined;
  }) => {
    const result = AddReview.safeParse({
      form: formBlock?.id,
      values: [
        {
          value: value.title,
          field: formBlock?.fields[0]?.id,
        },
        {
          value: value.review,
          field: formBlock?.fields[1]?.id,
        },
        {
          value: value.rating,
          field: formBlock?.fields[2]?.id,
        },
        {
          value: value.images,
          field: formBlock?.fields[3]?.id,
        },
        {
          value: value.product,
          field: formBlock?.fields[4]?.id,
        },
      ],
    });
    if (!result.success) {
      const errorsObject: ErrorMessages = {};

      result.error.issues.forEach((el) => {
        errorsObject[Number(el.path[1])] = el.message;
      });

      errorMessages.value = errorsObject;
    } else {
      const user = useDirectusUser();
      // TODO: review was added when user login on other tab and leave review another tab
      if (!user.value) {
        return createError({ message: "Please log in to write a review" });
      }
      await reviewStore.addReview(
        {
          user_created: user.value.id,
          title: form.title,
          review: form.review,
          rating: form.rating,
          product: product.value?.id,
        },
        form.images,
      );

      resetForm();
      emit("refetch");
      emit("refetchInfo");

      errorMessages.value = undefined;
      successMessage.value = formBlock?.success_message;

      clearSuccessMessageTimeout = setTimeout(clearSuccessMessage, 5000);
    }
  },
});

onUnmounted(() => {
  clearTimeout(clearSuccessMessageTimeout);
});

const statusMessage = computed(() =>
  asyncStatus.value === "loading"
    ? "Please wait..."
    : error.value
      ? error.value
      : undefined,
);
</script>

<template>
  <GSAPTransition
    :hidden="{
      height: 0,
      'min-height': 0,
      opacity: 1,
    }"
    :duration="0.25"
  >
    <section v-if="formBlock && isOpenForm" class="add-review">
      <MediumHeading :heading="formBlock.title" class="add-review__heading" />
      <form class="add-review__form" @submit.prevent="addReview(form)">
        <template v-for="(field, index) in formBlock.fields" :key="field.id">
          <Input
            v-if="field.type === 'text'"
            v-model="form.title"
            :label="field.label"
            :type="field.type"
            :name="field.name"
            :placeholder="field.placeholder"
            :required="field.required"
            :error="errorMessage(index)"
            class="add-review-form__title"
          />
          <Textarea
            v-if="field.type === 'textarea'"
            v-model="form.review"
            :label="field.label"
            :type="field.type"
            :name="field.name"
            :placeholder="field.placeholder"
            :required="field.required"
            :error="errorMessage(index)"
            class="add-review__form__text"
          />
          <div v-if="field.type === 'rating'" class="add-review__form__rating">
            <h3>
              <span
                v-if="field.required"
                class="add-review__form__rating__required"
              >
                *
              </span>
              {{ field.label }}
            </h3>
            <StarRating v-model="form.rating" change size="large" />
            <span class="add-review__form__rating__help">{{ field.help }}</span>
          </div>
          <UploadFiles
            v-if="field.type === 'file'"
            ref="exposeRef"
            v-model="form.images"
            :label="field.label"
            :name="field.name"
            :help="field.help"
            :placeholder="field.placeholder"
            :error="errorMessage(index)"
          />
        </template>
        <Button
          variant="fill"
          size="large"
          type="submit"
          :disabled="asyncStatus === 'loading'"
          class="add-review__form__button"
        >
          {{ formBlock.submit_label }}
        </Button>
      </form>
      <div v-if="statusMessage" class="add-review__status">
        <IconFieldError />
        {{ statusMessage }}
      </div>
      <div v-else-if="successMessage" class="add-review__success">
        <IconFieldError />
        {{ successMessage }}
      </div>
    </section>
  </GSAPTransition>
</template>

<style lang="scss">
@use "styles";
</style>
