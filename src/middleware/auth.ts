export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig();
  try {
    await $fetch("/auth/status", {
      baseURL: config.public.apiBaseUrl, // Use the public API base URL
      method: "GET",
      credentials: "include",
    });
    // Authenticated, allow navigation
  } catch {
    // Not authenticated, redirect to login
    return navigateTo("/login");
  }
});
