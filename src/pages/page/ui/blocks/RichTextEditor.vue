<script setup lang="ts">
import { getBlockRichTextEditor } from "~/src/shared/api";
import { Preloader } from "~/src/shared/ui/preloader";

const { itemId } = defineProps<{ itemId: string }>();

const { data, isLoading } = useQuery({
  key: () => ["rich-text-editors", itemId],
  query: async () => await getBlockRichTextEditor(itemId),
});
</script>

<template>
  <Preloader v-if="isLoading" />
  <section v-else-if="data" class="rich-text-editor">
    <h1 v-if="data.title" class="rich-text-editor__heading">
      {{ data.title }}
    </h1>
    <div class="rich-text-editor__body" v-html="data.text"></div>
  </section>
</template>

<style lang="scss">
.rich-text-editor {
  line-height: 1.5;

  &__heading {
    font-size: 32px;
    font-weight: 600;
    padding-bottom: 20px;

    @media (max-width: 991px) {
      font-size: 24px;
    }
  }

  &__body {
    h2 {
      font-size: 24px;
      padding: 10px 0;

      @media (max-width: 991px) {
        font-size: 20px;
        padding: 5px 0;
      }
    }

    h3 {
      font-size: 22px;
      padding: 10px 0;

      @media (max-width: 991px) {
        font-size: 18px;
        padding: 5px 0;
      }
    }

    p {
      padding: 10px 0 0;
    }

    strong {
      font-weight: 600;
      font-size: 17px;
    }

    hr {
      border: none;
      background-color: #232321;
      margin: 20px 0;
      box-shadow: none;
      height: 1px;
    }

    ul {
      list-style-type: disc;
      padding-left: 20px;

      li {
        line-height: 1.6;
      }
    }
  }
}
</style>
