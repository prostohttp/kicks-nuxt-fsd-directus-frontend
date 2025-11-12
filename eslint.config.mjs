// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/html-self-closing": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
  },
});
