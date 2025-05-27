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
    <UContainer class="mt-5">
      <UCard>
        <slot />
      </UCard>
    </UContainer>
  </div>
</template>

<style>
body {
  font-family: "Inter";
}
</style>
