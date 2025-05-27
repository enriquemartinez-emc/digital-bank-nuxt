export default defineNuxtRouteMiddleware(async () => {
  try {
    await $fetch("/auth/me", {
      method: "GET",
      credentials: "include",
    });
    // Authenticated, allow navigation
  } catch {
    // Not authenticated, redirect to login
    return navigateTo("/login");
  }
});
