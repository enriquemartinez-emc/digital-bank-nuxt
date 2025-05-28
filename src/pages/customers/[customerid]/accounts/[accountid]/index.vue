<script setup lang="ts">
const route = useRoute();
const customerId = route.params.customerid as string;
const accountId = route.params.accountid as string;
</script>

<template>
  <AccountDetail :customer-id="customerId" :account-id="accountId" />
</template>
