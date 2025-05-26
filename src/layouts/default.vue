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
  <AppHeader />
  <USeparator />
  <UContainer class="mt-5">
    <UCard>
      <slot />
    </UCard>
  </UContainer>
</template>

<style>
/* Set the font family for the entire site */
body {
  font-family: "Inter";
}
/* 
UContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--nui-background);
} */
</style>
