// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  srcDir: "src",
  ssr: false,
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/test-utils", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
});
