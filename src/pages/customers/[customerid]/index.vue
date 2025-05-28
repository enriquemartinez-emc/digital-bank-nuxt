<script setup lang="ts">
const route = useRoute();
const customerId = route.params.customerid as string;

const { customer, loading, error } = useCustomer(customerId);

function errorMessage(err: unknown) {
  if (!err) return "";
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null && "message" in err)
    return (err as { message?: string }).message;
  return "An error occurred.";
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">Customer Details</h2>
        <NuxtLink to="/customers">
          <UButton color="primary" variant="soft">Back to List</UButton>
        </NuxtLink>
      </div>
    </template>
    <div v-if="loading" class="py-8 text-center">
      <UProgress animation="carousel" />
    </div>
    <div v-else-if="error">
      <UAlert title="Error" :description="errorMessage(error)" color="error" />
    </div>
    <div v-else-if="!customer">
      <UAlert
        title="Not found"
        description="Customer not found."
        color="warning"
      />
    </div>
    <div v-else>
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-2">
          {{ customer.firstName }} {{ customer.lastName }}
        </h3>
        <p class="text-gray-600 mb-1">
          <strong>Email:</strong> {{ customer.email }}
        </p>
        <p class="text-gray-600 mb-1"><strong>ID:</strong> {{ customer.id }}</p>
        <!-- Add more customer fields as needed -->
      </div>
      <UButton
        :to="`/customers/${customer.id}/accounts`"
        color="primary"
        variant="outline"
      >
        View Accounts
      </UButton>
    </div>
  </UCard>
</template>
