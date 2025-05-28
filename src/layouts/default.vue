<script setup lang="ts">
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
      crossorigin: "",
    },
  ],
});
</script>

<template>
  <div>
    <AppHeader />
    <USeparator />
    <main class="p-4">
      <slot />
    </main>
  </div>
</template>

<style>
body {
  font-family: "Inter";
}
</style>
