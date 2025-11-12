<script setup lang="ts">
import { Button } from "~/src/shared/ui/Button";
import {
  Form,
  Input,
  Subscription,
  type FormTypes,
} from "~/src/shared/ui/form";
import { IconAdd } from "~/src/shared/ui/icons";
import { Logo } from "~/src/shared/ui/Logo";
import { createSubscription } from "../../api";

const form = defineProps<FormTypes>();
const email = ref("");
const message = ref();

const {
  mutate: createSubs,
  error,
  asyncStatus,
} = useMutation({
  mutation: async (value: string) => {
    const result = Subscription.safeParse({
      form: form.id,
      values: [
        {
          value,
          field: form.fields[0]?.id,
        },
      ],
    });
    if (!result.success) {
      message.value = result.error.issues[0]?.message;
    } else {
      message.value = form.success_message;
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
  <div class="footer-top">
    <div class="footer-top__left">
      <h2 class="footer-top__subscription-title">
        Join our KicksPlus <br />Club & get 15% off
      </h2>
      <p class="footer-top__subscription-text">
        Sign up for free! Join the community.
      </p>
      <Form class="footer-top__subscription-form" @submit="createSubs(email)">
        <template
          v-for="(
            { label, type, required, placeholder, name }, index
          ) in form.fields"
        >
          <Input
            v-if="type === 'text' && label === 'email'"
            :key="index"
            v-model="email"
            :type="type"
            theme="light"
            :name="name"
            :required="required"
            :placeholder="placeholder"
          />
        </template>
        <Button
          variant="fill"
          size="large"
          type="submit"
          :disabled="asyncStatus === 'loading'"
        >
          {{ form.submit_label }}
        </Button>
      </Form>
      <div v-if="statusMessage" class="footer-top__subscription-status">
        {{ statusMessage }}
      </div>
    </div>
    <div class="footer-top__right">
      <div class="footer-top-logo-with-icon">
        <Logo for-dark-mode />
        <IconAdd
          v-gsap.draggable.rotation
          class="footer-top-logo-with-icon__icon"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
