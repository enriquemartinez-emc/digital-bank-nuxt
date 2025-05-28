<script setup lang="ts">
const route = useRoute();
const customerId = route.params.customerid as string;
</script>

<template>
  <AccountForm :customer-id="customerId" />
</template>
