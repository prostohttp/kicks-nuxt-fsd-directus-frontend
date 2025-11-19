<script setup lang="ts">
import { IconAdd } from "~/src/shared/ui/icons";
import { Logo } from "~/src/shared/ui/Logo";
import { SubscriptionForm } from "~/src/features/email";
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
      <SubscriptionForm />
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
