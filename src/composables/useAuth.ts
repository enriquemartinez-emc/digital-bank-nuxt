import type { LoginCommand } from "@/types/";

export default function useAuth() {
  const config = useRuntimeConfig();
  const form = ref<LoginCommand>({ username: "", password: "" });
  const loading = ref(false);
  const error = ref("");
  const authenticated = ref(false);

  async function login() {
    loading.value = true;
    error.value = "";
    try {
      await $fetch("/auth/login", {
        baseURL: config.public.apiBaseUrl, // Use the public API base URL
        method: "POST",
        body: form.value,
        credentials: "include", // Ensures HTTP-only cookie is set
      });
      authenticated.value = true;
      return true;
    } catch (e) {
      // e is unknown, so we need to safely access its properties
      const err = e as { data?: { message?: string }; message?: string };
      error.value = err?.data?.message || err?.message || "Login failed";
      authenticated.value = false;
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function checkAuth() {
    try {
      await $fetch("/auth/status", {
        baseURL: config.public.apiBaseUrl, // Use the public API base URL
        method: "GET",
        credentials: "include", // Always include credentials
      });
      authenticated.value = true;
    } catch {
      authenticated.value = false;
    }
  }

  async function logout() {
    try {
      await $fetch("/auth/logout", {
        baseURL: config.public.apiBaseUrl, // Use the public API base URL
        method: "POST",
        credentials: "include",
      });
    } finally {
      authenticated.value = false;
    }
  }

  return {
    form,
    loading,
    error,
    authenticated,
    login,
    checkAuth,
    logout,
  };
}
