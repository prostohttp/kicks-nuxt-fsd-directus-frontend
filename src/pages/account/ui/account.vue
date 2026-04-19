<script setup lang="ts">
import type { Component } from "vue";
import { AccountTabs, type AccountTabValue } from "~/src/entities/Account";
import { UserDetailsForm } from "~/src/features/account";
import { LogoutButton } from "~/src/features/auth";
import {
  TabContent,
  TabHeader,
  type TabHeaderType,
} from "~/src/shared/ui/tabs";
import { AppChat } from "~/src/widgets/AppChat";
import { OrderAccountList } from "~/src/widgets/Order";

useSeoMeta({
  title: "Account page",
});

const tabHeader: TabHeaderType<AccountTabValue>[] = [
  { id: 1, title: "User Details", name: "user-details" },
  { id: 2, title: "Orders", name: "orders" },
  { id: 3, title: "Messages", name: "messages" },
];

const tabContent: Record<AccountTabValue, Component> = {
  "user-details": UserDetailsForm,
  orders: OrderAccountList,
  messages: AppChat,
};

function isValidAccountTab(value: string): value is AccountTabValue {
  return Object.values(AccountTabs).includes(value as AccountTabValue);
}

const route = useRoute();

const active = computed<AccountTabValue>({
  get() {
    const value = route.query.tab as string;
    const tab = Array.isArray(value) ? value[0] : value;
    return isValidAccountTab(tab as AccountTabValue) ? tab : tabHeader[0]?.name;
  },
  set(value) {
    navigateTo({
      query: {
        ...route.query,
        tab: value,
      },
    });
  },
});
</script>

<template>
  <section class="account-page">
    <TabHeader v-model="active" :header="tabHeader">
      <LogoutButton> Log Out </LogoutButton>
    </TabHeader>
    <TabContent>
      <keep-alive>
        <component :is="tabContent[active]" :key="active" />
      </keep-alive>
    </TabContent>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
