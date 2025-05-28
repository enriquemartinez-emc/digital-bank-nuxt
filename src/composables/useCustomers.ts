export default function useCustomers() {
  const {
    data: customers,
    pending: loading,
    error,
    refresh: fetchCustomers,
  } = useFetch("/customers", {
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    method: "GET",
    credentials: "include",
    default: () => [],
  });

  return {
    customers,
    loading,
    error,
    fetchCustomers,
  };
}
