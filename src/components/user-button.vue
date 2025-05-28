<script setup lang="ts">
const { logout } = useAuth();

const userMenuItems = [
  {
    label: "Profile",
    icon: "i-lucide-user",
    to: "/profile",
  },
  {
    label: "Logout",
    icon: "i-lucide-log-out",
    async onSelect() {
      await logout();
      window.location.href = "/login";
    },
  },
];
</script>

<template>
  <UDropdownMenu
    :items="userMenuItems"
    :ui="{ content: 'w-48' }"
    placement="bottom-end"
  >
    <UButton
      color="primary"
      variant="soft"
      class="ml-2 p-0 rounded-full w-10 h-10 flex items-center justify-center"
    >
      <span class="w-8 h-8 rounded-full flex items-center justify-center">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M16 20c0-2.21-1.79-4-4-4s-4 1.79-4 4" />
        </svg>
      </span>
    </UButton>
  </UDropdownMenu>
</template>
