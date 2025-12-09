<script setup lang="ts">
import { Logo } from "~/src/shared/ui/Logo";
import { VerticalMenu, type Navigation } from "~/src/shared/ui/navigation";
import { iconsMapper } from "../../model/iconsMapper";
import type { Copyright, Description, Social } from "~/src/shared/api";

interface PropTypes {
  copyrights?: Copyright;
  categories?: Navigation;
  company?: Navigation;
  about?: Description;
  social?: Social;
}

const { copyrights, about, categories, company, social } =
  defineProps<PropTypes>();
</script>

<template>
  <div class="footer-bottom">
    <div class="footer-bottom__section">
      <div class="footer-bottom__section__one">
        <h3>About us</h3>
        <p>
          {{ about?.description }}
        </p>
      </div>
      <div class="footer-bottom__section__two">
        <VerticalMenu v-if="categories" v-bind="categories" />
      </div>
      <div class="footer-bottom__section__three">
        <VerticalMenu v-if="company" v-bind="company" />
      </div>
      <div class="footer-bottom__section__four">
        <h4>Follow us</h4>
        <ul v-if="social" class="social-links">
          <li
            v-for="(item, index) in social.social_links"
            :key="index"
            class="social-links__item"
          >
            <NuxtLink :to="item.url" external target="_blank">
              <component :is="iconsMapper[item.service]" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom__logo">
      <Logo for-dark-mode />
    </div>
  </div>
  <div class="copyright">
    <p
      v-if="copyrights"
      class="copyright__text"
      v-html="copyrights.copyright"
    ></p>
  </div>
</template>

<style lang="scss">
@use "styles";
</style>
