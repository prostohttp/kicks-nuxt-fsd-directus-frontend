<script setup lang="ts">
import { CollectionType } from "~/src/shared/api";
import { getRegisterBenefits } from "../api";
import { LoginForm, RegisterForm } from "~/src/features/auth";
import { Preloader } from "~/src/shared/ui/preloader";

useSeoMeta({
  title: "Authentication page",
});

const { data: benefits, isLoading } = useQuery({
  key: ["register-page-benefits"],
  query: async () => await getRegisterBenefits(CollectionType.SETTINGS),
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else class="auth">
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
