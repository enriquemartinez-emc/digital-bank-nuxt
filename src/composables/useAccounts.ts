export default function useAccounts(customerId: string) {
  const {
    data: accounts,
    pending: loading,
    error,
    refresh: fetchAccounts,
  } = useFetch(() => `/customers/${customerId}/accounts`, {
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    method: "GET",
    credentials: "include",
    default: () => [],
  });

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
  };
}
