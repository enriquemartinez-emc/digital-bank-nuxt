export default async function useCustomers() {
  const config = useRuntimeConfig();
  const {
    data: customers,
    pending: loading,
    error,
    refresh: fetchCustomers,
  } = await useFetch("/customers", {
    baseURL: config.public.apiBaseUrl,
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
