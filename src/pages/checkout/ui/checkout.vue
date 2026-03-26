<script setup lang="ts">
import { CreateOrderForm } from "~/src/features/order";
import { OrderDetails, OrderSummary } from "~/src/widgets/Order";
</script>

<template>
  <section class="checkout-page">
    <div class="checkout-page__wrapper">
      <div class="checkout-page__wrapper__form">
        <CreateOrderForm />
      </div>
      <div class="checkout-page__wrapper__order">
        <div class="sticky-order">
          <div class="checkout-page__wrapper__order__summary checkout-page__wrapper__order--bg">
            <OrderSummary />
          </div>
          <div class="checkout-page__wrapper__order__details checkout-page__wrapper__order--bg">
            <OrderDetails />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
