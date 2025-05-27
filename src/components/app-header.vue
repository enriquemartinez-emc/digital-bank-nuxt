<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  { label: "Dashboard", icon: "i-lucide-layout-dashboard", to: "/" },
  { label: "Customers", icon: "i-lucide-users", to: "/customers" },
  { label: "Accounts", icon: "i-lucide-credit-card", to: "/accounts" },
  { label: "Transactions", icon: "i-lucide-repeat", to: "/transactions" },
  { label: "Settings", icon: "i-lucide-settings", to: "/settings" },
]);
</script>

<template>
  <header class="flex items-center p-2 justify-between w-full">
    <div class="flex items-center flex-1 min-w-0 ml-5">
      <NuxtLink to="/" class="text-lg font-bold whitespace-nowrap">
        Digital Bank
      </NuxtLink>
    </div>
    <div class="flex-1 flex justify-center min-w-0">
      <UNavigationMenu
        :items="items"
        color="primary"
        variant="link"
        class="w-full"
      />
    </div>
    <div class="flex items-center gap-2 flex-1 justify-end min-w-0 mr-5">
      <ColorModeButton />
    </div>
  </header>
</template>
