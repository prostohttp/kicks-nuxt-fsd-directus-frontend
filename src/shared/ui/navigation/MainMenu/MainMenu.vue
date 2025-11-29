<script setup lang="ts">
import { IconBurger, IconCaretDown, IconClose } from "~/src/shared/ui/icons";
import LinkVariant from "../components/LinkVariant.vue";
import type { Navigation as PropTypes } from "../types";

const { items: menuItems } = defineProps<PropTypes>();

const isVisibleMenu: Record<number, boolean> = reactive({
  1: false,
  2: false,
});
const resetMenu = () => {
  for (const key in isVisibleMenu) {
    isVisibleMenu[key] = false;
  }
  isVisibleMobileMenu.value = false;
};
const openMenu = (arrayLength: number, index: number) => {
  if (arrayLength !== 0 && !isVisibleMobileMenu.value) {
    isVisibleMenu[index] = true;
  }
};
const closeMenu = (arrayLength: number, index: number) => {
  if (arrayLength !== 0 && !isVisibleMobileMenu.value) {
    isVisibleMenu[index] = false;
  }
};
const openCloseMenu = (arrayLength: number, index: number) => {
  if (arrayLength !== 0 && isVisibleMobileMenu.value) {
    for (const key in isVisibleMenu) {
      if (key !== index.toString()) {
        isVisibleMenu[key] = false;
      }
    }
    isVisibleMenu[index] = !isVisibleMenu[index];
  } else if (isVisibleMobileMenu.value) {
    resetMenu();
  }
};

const isVisibleMobileMenu = ref(false);
const openCloseMobileMenu = () => {
  isVisibleMobileMenu.value = !isVisibleMobileMenu.value;
  for (const key in isVisibleMenu) {
    isVisibleMenu[key] = false;
  }
};
const isLarge = useMediaQuery("(min-width: 991px)", {
  ssrWidth: 768,
});
watch(
  [isVisibleMobileMenu, isLarge],
  ([newIsVisibleMobileMenu, newIsLarge]) => {
    if (newIsVisibleMobileMenu && !newIsLarge) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  },
);
</script>

<template>
  <nav>
    <button
      class="mobile-menu-trigger"
      :data-visible="isVisibleMobileMenu"
      @click="openCloseMobileMenu"
    >
      <GSAPTransition
        :hidden="{ opacity: 0, scale: 0, rotate: 180 }"
        :duration="0.3"
        ease="expo.in"
      >
        <IconClose
          v-if="isVisibleMobileMenu"
          class="mobile-menu-trigger-icon icon-close"
        />
        <IconBurger v-else class="mobile-menu-trigger-icon" />
      </GSAPTransition>
    </button>
    <ul
      v-gsap.onState-visible.delay-100.mobile.to="{
        height: '100%',
        opacity: 1,
        transformOrigin: 'center',
        duration: 0.2,
      }"
      class="horizontal-menu"
      :data-visible="isVisibleMobileMenu"
    >
      <li
        v-for="({ navigation_items_id: parent }, parent_index) in menuItems"
        :key="parent_index"
        class="horizontal-menu__item"
        @click="openCloseMenu(parent.children.length, parent_index)"
        @mouseleave="closeMenu(parent.children.length, parent_index)"
        @mouseenter="openMenu(parent.children.length, parent_index)"
      >
        <LinkVariant v-bind="parent" class="horizontal-menu__item-link" />
        <IconCaretDown
          v-if="parent.children.length"
          class="horizontal-menu__item-link-icon"
        />
        <ul
          v-if="parent.children.length"
          v-gsap.onState-visible.delay-100.desktop.to="{
            height: 'auto',
            opacity: 1,
            y: 0,
            duration: 0.15,
          }"
          v-gsap.onState-visible.mobile.to="{
            height: 'auto',
            opacity: 1,
            y: 0,
            duration: 0.15,
          }"
          class="horizontal-menu__item-children"
          :data-visible="isVisibleMenu[parent_index]"
        >
          <li
            v-for="(
              { related_navigation_items_id: child }, child_index
            ) in parent.children"
            :key="child_index"
            class="horizontal-menu__item"
            @click="resetMenu"
          >
            <LinkVariant v-bind="child" class="horizontal-menu__item-link" />
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use "styles";
</style>
