export default function useAccountDetail(
  customerId: string,
  accountId: string
) {
  const {
    data: account,
    pending: loading,
    error,
    refresh: fetchAccount,
  } = useFetch(() => `/customers/${customerId}/accounts/${accountId}`, {
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    method: "GET",
    credentials: "include",
    default: () => null,
    watch: [() => customerId, () => accountId],
  });

  return {
    account,
    loading,
    error,
    fetchAccount,
  };
}
