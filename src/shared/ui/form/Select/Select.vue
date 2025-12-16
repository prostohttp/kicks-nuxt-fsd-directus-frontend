<script setup lang="ts">
import { IconChevronDown } from "../../icons";
import type { SelectItemType } from "./types";

const { list } = defineProps<{ list: SelectItemType[] }>();
const selected = defineModel<string>({ required: true });

const isOpen = ref(false);
const toggleVisibilityMenuHandler = () => {
  isOpen.value = !isOpen.value;
};
const selectActiveItem = (label: string) => {
  selected.value = label;
  toggleVisibilityMenuHandler();
};
const menuRef = useTemplateRef("menuRef");
const menuSelectedRef = useTemplateRef("menuSelectedRef");
onClickOutside(menuRef, () => (isOpen.value = false), {
  ignore: [menuSelectedRef],
});
</script>

<template>
  <section class="select">
    <div
      ref="menuSelectedRef"
      class="select__active-value"
      :class="{ 'menu-open': isOpen }"
      @click="toggleVisibilityMenuHandler"
    >
      <span>{{ selected }}</span>
      <IconChevronDown />
    </div>
    <GSAPTransition :hidden="{ height: 0, alpha: 0 }" :duration="0.15">
      <ul
        v-if="isOpen"
        ref="menuRef"
        class="select__list"
        :data-visible="isOpen"
      >
        <template v-for="item in list" :key="item.value">
          <li
            class="select__list__item"
            :class="{ 'select__list__item-selected': item.label === selected }"
            @click="selectActiveItem(item.label)"
          >
            {{ item.label }}
          </li>
        </template>
      </ul>
    </GSAPTransition>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
