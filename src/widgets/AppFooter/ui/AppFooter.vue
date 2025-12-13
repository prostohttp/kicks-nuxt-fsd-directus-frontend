<script setup lang="ts">
import FooterTop from "./FooterTop/FooterTop.vue";
import FooterBottom from "./FooterBottom/FooterBottom.vue";

import {
  getCategoriesMenu,
  getCompanyMenu,
  getCopyright,
  getDescription,
  getSocial,
} from "~/src/shared/api";

const { data: copyrights } = useQuery({
  key: ["copyrights"],
  query: async () => await getCopyright(),
});

const { data: categories } = useQuery({
  key: ["categories-menu"],
  query: async () => await getCategoriesMenu(),
});

const { data: company } = useQuery({
  key: ["company-menu"],
  query: async () => await getCompanyMenu(),
});

const { data: about } = useQuery({
  key: ["app-description"],
  query: async () => await getDescription(),
});

const { data: social } = useQuery({
  key: ["app-social"],
  query: async () => await getSocial(),
});
</script>

<template>
  <footer class="footer">
    <FooterTop />
    <FooterBottom v-bind="{ copyrights, categories, company, about, social }" />
  </footer>
</template>

<style lang="scss">
@use "styles";
</style>
