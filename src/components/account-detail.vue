<script setup lang="ts">
const props = defineProps<{ customerId: string; accountId: string }>();
const { account, loading, error } = useAccountDetail(
  props.customerId,
  props.accountId
);
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Account Detail</h2>
        <UButton
          :to="`/customers/${props.customerId}/accounts`"
          color="primary"
          variant="soft"
          >Back to Accounts</UButton
        >
      </div>
    </template>
    <div v-if="loading" class="py-8 text-center">
      <UProgress animation="carousel" />
    </div>
    <div v-else-if="error">
      <UAlert color="error">{{ error }}</UAlert>
    </div>
    <div v-else-if="account">
      <div class="space-y-2">
        <div><b>Account Number:</b> {{ account.accountNumber }}</div>
        <div><b>Initial Balance:</b> {{ account.balance }}</div>
      </div>
    </div>
    <div v-else>
      <UAlert color="warning">No account data found.</UAlert>
    </div>
  </UCard>
</template>
