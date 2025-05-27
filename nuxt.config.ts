// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from "nuxt/schema";

// hooks configuration restored to programmatically set 'auth' middleware for all pages except /login
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  srcDir: "src",
  ssr: false,
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/test-utils", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE || "http://localhost:5176/api",
    },
  },
  hooks: {
    "pages:extend"(pages: NuxtPage[]) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          // Set 'auth' middleware for all pages except login
          if (page.path !== "/login") {
            page.meta ||= {};
            page.meta.middleware = ["auth"];
          }
          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }
      setMiddleware(pages);
    },
  },
});
