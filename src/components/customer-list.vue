<script setup lang="ts">
const { customers, loading, error } = useCustomers();
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Customers</h2>
        <UButton to="/customers/create" color="primary">Add Customer</UButton>
      </div>
    </template>
    <div v-if="loading" class="py-8 text-center">
      <UProgress animation="carousel" />
    </div>
    <div v-else-if="error">
      <UAlert title="Heads up!" description="error" color="error" />
    </div>
    <div v-else>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">First Name</th>
            <th class="px-4 py-2 text-left">Last Name</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in customers" :key="row.id">
            <td class="px-4 py-2">{{ row.firstName }}</td>
            <td class="px-4 py-2">{{ row.lastName }}</td>
            <td class="px-4 py-2">{{ row.email }}</td>
            <td class="px-4 py-2">
              <UButton
                :to="`/customers/${row.id}`"
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
