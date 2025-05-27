export default function useCustomers() {
  const config = useRuntimeConfig();
  const {
    data: customers,
    pending: loading,
    error,
    refresh: fetchCustomers,
  } = useFetch("/customers", {
    baseURL: config.public.apiBaseUrl,
    method: "GET",
    credentials: "include",
    default: () => [],
  });

  console.log("Customers", customers.value);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
  };
}
