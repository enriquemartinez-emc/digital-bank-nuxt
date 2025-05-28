import { ref } from 'vue';

// Define a Customer type inline since there is no exported Customer type
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add more fields as needed
}

export function useCustomer(id: string) {
  const customer = ref<Customer | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCustomer() {
    loading.value = true;
    error.value = null;
    try {
      const data = await $fetch(`/customers/${id}`, {
        baseURL: useRuntimeConfig().public.apiBaseUrl, 
        credentials: 'include',
      });
      customer.value = data as Customer;
    } catch (e) {
      const err = e as { data?: { message?: string }; message?: string };
      error.value = err?.data?.message || err?.message || 'Failed to fetch customer';
      customer.value = null;
    } finally {
      loading.value = false;
    }
  }

  fetchCustomer();

  return { customer, loading, error, fetchCustomer };
}
