<script setup lang="ts">
import { logOutUser } from "./api";
import { IconArrowRight, IconCircleLoading } from "~/src/shared/ui/icons";
import { ErrorMessage } from "~/src/shared/ui/message";
import { ROUTES } from "~/src/shared/routes";
import { Button } from "~/src/shared/ui/form";

const loading = computed(() => asyncStatus.value === "loading");
const {
  mutate: logOutHandler,
  error,
  asyncStatus,
  reset,
} = useMutation({
  mutation: async () => {
    await logOutUser();
    navigateTo(ROUTES.auth);
  },
});
</script>

<template>
  <section class="logout-button">
    <Button variant="fill" size="large" @click="logOutHandler">
      <slot />
      <template #right-icon>
        <IconCircleLoading v-if="loading" />
        <IconArrowRight v-else />
      </template>
    </Button>
    <ErrorMessage v-if="error" style="margin-top: 20px" @close="reset">
      <p>
        We’re sorry, but there was a problem logging you out of your account.<br />
        Please try again or refresh the page. If the issue persists, check your
        internet connection or contact our support team for assistance.
      </p>
    </ErrorMessage>
  </section>
</template>
