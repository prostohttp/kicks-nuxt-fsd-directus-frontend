<script setup lang="ts">
import { Button, Input, Textarea } from "~/src/shared/ui/form";
import { FastOrder, type FastOrderType } from "../../model/fastOrderSchema";
import { useOrderStore } from "../../model/stores/order";
import { ErrorMessage, SuccessMessage } from "~/src/shared/ui/message";
import { IconArrowRight, IconCircleLoading } from "~/src/shared/ui/icons";

const { optionIds, count, productId } = defineProps<{
  optionIds: {
    option_values_id: string;
  }[];
  count: number;
  productId: number;
}>();

const orderStore = useOrderStore();

const user = useDirectusUser();

const { fastOrder } = storeToRefs(orderStore);

const isUserAndName = computed(() =>
  user.value && user.value.first_name ? user.value.first_name : "",
);

fastOrder.value.name = isUserAndName.value;

const isUserAndEmail = computed(() =>
  user.value && user.value.email ? user.value.email : "",
);

fastOrder.value.email = isUserAndEmail.value;

const errors = ref<Partial<FastOrderType>>({
  name: "",
  email: "",
});

const clearErrors = () => {
  errors.value.name = "";
  errors.value.email = "";
};

const isCreatedOrder = ref(false);

const {
  mutate: createOrder,
  error,
  reset,
  asyncStatus,
} = useMutation({
  mutation: async (data: FastOrderType) => {
    const result = FastOrder.safeParse(data);
    clearErrors();

    if (!result.success) {
      result.error.issues.forEach((error) => {
        const key = error.path[0];
        if (key && key in errors.value) {
          if (key === "name") errors.value.name = error.message;
          if (key === "email") errors.value.email = error.message;
        }
      });
    } else {
      await orderStore.createFastOrder(result.data);
      clearErrors();
      isCreatedOrder.value = true;
    }
  },
});

const isLoading = computed(() => asyncStatus.value === "loading");

watchEffect(() => {
  fastOrder.value.product_count = count;
  fastOrder.value.options = optionIds;
  fastOrder.value.product = productId;
});
</script>

<template>
  <section class="fast-order-form">
    <form @submit.prevent="createOrder(fastOrder)">
      <div class="row">
        <Input
          v-model="fastOrder.name"
          name="name"
          placeholder="* Name"
          :error="errors.name"
        />
        <Input
          v-model="fastOrder.email"
          name="email"
          placeholder="* Email"
          :error="errors.email"
        />
      </div>
      <Textarea
        v-model="fastOrder.comment"
        name="comment"
        placeholder="Comment"
      />
      <Button type="submit" variant="fill" size="large" :disabled="isLoading">
        <template #default>Submit</template>
        <template #right-icon>
          <IconCircleLoading v-if="isLoading" />
          <IconArrowRight v-else />
        </template>
      </Button>
    </form>
    <ErrorMessage v-if="error" style="margin-top: 15px" @close="reset">
      An unexpected error occurred while processing your order. Please try again
      later.
    </ErrorMessage>
    <SuccessMessage
      v-if="isCreatedOrder"
      style="margin-top: 15px"
      @close="isCreatedOrder = false"
    >
      Your quick order for the product has been successfully placed. <br />
      We will contact you shortly at the email address you provided.
    </SuccessMessage>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
