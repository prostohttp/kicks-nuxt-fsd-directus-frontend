<script setup lang="ts">
import { Button, Form, Input } from "~/src/shared/ui/form";
import { IconArrowRight, IconCircleLoading } from "~/src/shared/ui/icons";
import { Login } from "../../model/loginSchema";
import { loginUser } from "./api";
import { ROUTES } from "~/src/shared/routes";
import {
  ErrorMessage,
  SuccessWithCallbackMessage,
} from "~/src/shared/ui/message";

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
const refresh = () => {
  email.value = "";
  password.value = "";
  isSuccess.value = false;
};

const isSuccess = ref(false);
const email = ref();
const password = ref();
const redirectToAccount = () => {
  setTimeout(() => {
    navigateTo(ROUTES.account);
    refresh();
  }, 3000);
};
const loading = computed(
  () => asyncStatus.value === "loading" || isSuccess.value,
);

const {
  mutate: loginHandler,
  error,
  reset,
  asyncStatus,
} = useMutation({
  mutation: async (data: { email: string; password: string }) => {
    const result = Login.safeParse({
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
      await loginUser(email.value, password.value);
      isSuccess.value = true;
      clearErrors();
    }
  },
});
</script>

<template>
  <section class="login-form">
    <h3 class="login-form__heading">Login</h3>
    <Form @submit="loginHandler({ email, password })">
      <Input
        v-model="email"
        name="login-email"
        placeholder="Email"
        :error="errors.email"
        success=""
      />
      <Input
        v-model="password"
        name="login-password"
        type="password"
        placeholder="Password"
        :error="errors.password"
        success=""
      />
      <Button variant="fill" size="large" type="submit" :disabled="loading">
        <template #default>Email login</template>
        <template #right-icon>
          <IconCircleLoading v-if="loading" />
          <IconArrowRight v-else />
        </template>
      </Button>
    </Form>
    <SuccessWithCallbackMessage
      v-if="isSuccess"
      style="margin-top: 15px"
      @callback="redirectToAccount"
    >
      You have successfully logged in. <br />You will now be redirected to your
      account page.
    </SuccessWithCallbackMessage>
    <ErrorMessage v-if="error" style="margin-top: 15px" @close="reset">
      Invalid credentials. Try again.
    </ErrorMessage>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
