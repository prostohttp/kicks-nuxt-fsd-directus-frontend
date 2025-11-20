<script setup lang="ts">
import { Button } from "~/src/shared/ui/Button";
import { Checkbox, Form, Input } from "~/src/shared/ui/form";
import { IconArrowRight, IconCircleLoading } from "~/src/shared/ui/icons";
import { registerUser } from "./api";
import { Register } from "../../model/registerSchema";
import { ErrorMessage, SuccessMessage } from "~/src/shared/ui/message";
import { loginUser } from "../LoginForm/api";
import { ROUTES } from "~/src/shared/routes";

interface ErrorsType {
  email: string;
  password: string;
}
const errors = ref<ErrorsType>({
  email: "",
  password: "",
});
const clearErrors = () => {
  errors.value.email = "";
  errors.value.password = "";
};

const isSuccess = ref(false);
const email = ref();
const password = ref();
const isLoginMe = ref(true);

const loading = computed(() => asyncStatus.value === "loading");

const {
  mutate: registerHandler,
  error,
  asyncStatus,
  reset,
} = useMutation({
  mutation: async (data: { email: string; password: string }) => {
    const result = Register.safeParse({
      email: data.email,
      password: data.password,
    });
    clearErrors();

    if (!result.success) {
      result.error.issues.forEach((error) => {
        const key = error.path[0];
        if (key && key in errors.value) {
          if (key === "email") errors.value.email = error.message;
          if (key === "password") errors.value.password = error.message;
        }
      });
    } else {
      await registerUser(email.value, password.value);
      if (isLoginMe.value) {
        await loginUser(email.value, password.value);
        navigateTo(ROUTES.account);
      } else {
        isSuccess.value = true;
        clearErrors();
      }
    }
  },
});
</script>

<template>
  <section class="register-form">
    <h3 class="register-form__heading">Register</h3>
    <Form @submit="registerHandler({ email, password })">
      <Input
        v-model="email"
        name="register-email"
        placeholder="Email"
        :error="errors.email"
        success=""
      />
      <Input
        v-model="password"
        name="register-password"
        type="password"
        placeholder="Password"
        :error="errors.password"
        success=""
      />
      <Checkbox
        v-model="isLoginMe"
        name="isLoginMe"
        label="Automatically authorize me upon registration."
      />
      <Button variant="fill" size="large" type="submit" :disabled="loading">
        <template #default>Register</template>
        <template #right-icon>
          <IconCircleLoading v-if="loading" />
          <IconArrowRight v-else />
        </template>
      </Button>
    </Form>
    <SuccessMessage
      v-if="isSuccess"
      style="margin-top: 15px"
      @close="isSuccess = false"
    >
      You have successfully register in. <br />Now you can login.
    </SuccessMessage>
    <ErrorMessage v-if="error" style="margin-top: 15px" @close="reset">
      Email must be unique. Try again.
    </ErrorMessage>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
