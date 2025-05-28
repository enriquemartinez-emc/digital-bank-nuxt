<script setup lang="ts">
const props = defineProps<{ customerId: string }>();
const { accounts, loading, error } = useAccounts(props.customerId);
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Accounts</h2>
        <UButton
          :to="`/customers/${props.customerId}/accounts/create`"
          color="primary"
          >Add Account</UButton
        >
      </div>
    </template>
    <div v-if="loading" class="py-8 text-center">
      <UProgress :indeterminate="true" />
    </div>
    <div v-else-if="error">
      <UAlert color="error">{{ error }}</UAlert>
    </div>
    <div v-else>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">Account Number</th>
            <th class="px-4 py-2 text-left">Initial Balance</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in accounts" :key="row.id">
            <td class="px-4 py-2">{{ row.accountNumber }}</td>
            <td class="px-4 py-2">{{ row.balance }}</td>
            <td class="px-4 py-2">
              <UButton
                :to="`/customers/${props.customerId}/accounts/${row.id}`"
                size="sm"
                color="primary"
                variant="soft"
                >View</UButton
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UCard>
</template>
