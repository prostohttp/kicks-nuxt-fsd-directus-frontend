// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false, for simple deploy only!
  // ssr: false,
  app: {
    head: {
      title: "Kicks marketplace",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  experimental: {
    viewTransition: true,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  alias: {
    "@": "../src",
  },
  dir: {
    pages: "./src/app/routes",
    layouts: "./src/app/layouts",
    plugins: "./src/shared/lib/plugins",
    middleware: "./src/app/middleware",
  },
  css: ["@/app/styles/global.scss"],
  fonts: {
    families: [
      {
        name: "Open Sans",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
      {
        name: "Rubik",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
    ],
  },
  runtimeConfig: {
    public: {
      directus: {
        // url: process.env.NUXT_PUBLIC_API_BASE,
        url: "http://localhost:8055",
      },
    },
  },
  image: {
    presets: {
      webp: {
        modifiers: {
          fit: "cover",
          format: "webp",
        },
      },
    },
    directus: {
      baseURL: "http://localhost:8055/assets",
    },
  },
  vgsap: {
    presets: [],
    breakpoint: 991,
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "img-src": false,
      },
    },
  },
  directus: {
    cookieMaxAge: 7 * 24 * 60 * 60 * 1000,
    autoRefresh: true,
    autoFetch: true,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@pinia/colada-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-typed-router",
    "@nuxtjs/seo",
    "nuxt-directus",
    "v-gsap-nuxt",
    "nuxt-security",
    "vue3-carousel-nuxt",
  ],
});
