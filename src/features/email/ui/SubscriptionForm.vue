<script setup lang="ts">
import { Button, Input } from "~/src/shared/ui/form";
import { getForm } from "~/src/shared/api";
import { Subscription } from "../model/subscriptionSchema";
import { createSubscription } from "../api";

const email = ref("");
const message = ref();

const FORM_ID = "1";
const { data: form } = useQuery({
  key: () => ["form-subscription", FORM_ID],
  query: async () => await getForm(FORM_ID),
});

const {
  mutate: createSubs,
  error,
  asyncStatus,
} = useMutation({
  mutation: async (value: string) => {
    const result = Subscription.safeParse({
      form: form.value?.id,
      values: [
        {
          value,
          field: form.value?.fields[0]?.id,
        },
      ],
    });
    if (!result.success) {
      message.value = result.error.issues[0]?.message;
    } else {
      message.value = form.value?.success_message;
      await createSubscription([result.data]);
      email.value = "";
    }
  },
});
const statusMessage = computed(() =>
  asyncStatus.value === "loading"
    ? "Please wait"
    : error.value
      ? "Something went wrong"
      : message.value,
);
watch(error, (newValue) => {
  if (newValue) {
    console.log(newValue);
  }
});
</script>

<template>
  <section class="subscription-form">
    <form @submit.prevent="createSubs(email)">
      <template
        v-for="({ label, type, placeholder, name }, index) in form?.fields"
        :key="index"
      >
        <Input
          v-if="type === 'text' && label === 'email'"
          v-model="email"
          :type="type"
          theme="light"
          :name="name"
          :placeholder="placeholder"
        />
      </template>
      <Button
        variant="fill"
        size="large"
        type="submit"
        :disabled="asyncStatus === 'loading'"
      >
        {{ form?.submit_label }}
      </Button>
    </form>
    <div v-if="statusMessage" class="subscription-form__status">
      {{ statusMessage }}
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
