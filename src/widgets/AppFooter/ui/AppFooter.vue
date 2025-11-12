<script setup lang="ts">
import FooterTop from "./FooterTop/FooterTop.vue";
import FooterBottom from "./FooterBottom/FooterBottom.vue";
import {
  getCategories,
  getCompany,
  getCopyright,
  getDescription,
  getForm,
  getSocial,
} from "../api";
import type { Copyright, Description, Social } from "../model/types";
import type { FormTypes } from "~/src/shared/ui/form";
import type { Navigation } from "~/src/shared/ui/navigation";

const { data: copyrights } = useQuery({
  key: ["copyrights"],
  query: async () => (await getCopyright()) as Copyright,
});

const { data: categories } = useQuery({
  key: ["categories-menu"],
  query: async () => (await getCategories()) as Navigation,
});

const { data: company } = useQuery({
  key: ["company-menu"],
  query: async () => (await getCompany()) as Navigation,
});

const { data: about } = useQuery({
  key: ["app-description"],
  query: async () => (await getDescription()) as Description,
});

const { data: social } = useQuery({
  key: ["app-social"],
  query: async () => (await getSocial()) as Social,
});

const { data: form } = useQuery({
  key: ["form-subscription"],
  query: async () => (await getForm("1")) as FormTypes,
});
</script>

<template>
  <footer class="footer wrapper">
    <FooterTop v-if="form" v-bind="form" />
    <FooterBottom v-bind="{ copyrights, categories, company, about, social }" />
  </footer>
</template>

<style lang="scss">
@use "styles";
</style>
