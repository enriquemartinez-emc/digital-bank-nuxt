import type { AccountData } from "@/types";

export default function useAccountCreate(customerId: string) {
  const form = ref<AccountData>({ accountNumber: "", initialBalance: 0 });
  const loading = ref(false);
  const error = ref("");

  async function createAccount() {
    loading.value = true;
    error.value = "";
    try {
      await $fetch(`/api/customers/${customerId}/accounts`, {
        method: "POST",
        body: form.value,
        credentials: "include",
      });
      return true;
    } catch (e: any) {
      error.value =
        e?.data?.message || e?.message || "Failed to create account";
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    form,
    loading,
    error,
    createAccount,
  };
}
