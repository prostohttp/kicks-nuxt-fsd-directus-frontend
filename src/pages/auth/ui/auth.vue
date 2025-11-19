<script setup lang="ts">
import { CollectionType } from "~/src/shared/api";
import { getRegisterBenefits } from "../api";
import { LoginForm, RegisterForm } from "~/src/features/auth";

useSeoMeta({
  title: "Authentication page"
})

const { data: benefits } = useQuery({
  key: ["register-page-benefits"],
  query: async () => await getRegisterBenefits(CollectionType.SETTINGS),
});
</script>

<template>
  <section class="auth">
    <div class="auth__forms">
      <LoginForm />
      <h3 class="auth__forms__divider">OR</h3>
      <RegisterForm />
    </div>
    <div class="auth__benefits" v-html="benefits?.auth_info"></div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
