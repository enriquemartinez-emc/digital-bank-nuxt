<script setup lang="ts">
const route = useRoute();
const customerId = route.params.customerId as string;
</script>

<template>
  <AccountList :customer-id="customerId" />
</template>
