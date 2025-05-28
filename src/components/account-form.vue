<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps<{ customerId: string }>();
const { form, loading, error, createAccount } = useAccountCreate(
  props.customerId
);

const schema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  initialBalance: z.preprocess(
    (v) => (typeof v === "string" ? parseFloat(v) : v),
    z
      .number({ invalid_type_error: "Initial balance must be a number" })
      .min(0, "Initial balance must be at least 0")
  ),
});
type Schema = z.infer<typeof schema>;

// Create a local state for the form that matches the schema
const state = reactive({
  accountNumber: "",
  initialBalance: 0,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value.accountNumber = event.data.accountNumber;
  form.value.initialBalance = event.data.initialBalance;
  const success = await createAccount();
  if (success) {
    await navigateTo(`/customers/${props.customerId}/accounts`);
  }
}
</script>

<template>
  <UCard class="max-w-md mx-auto">
    <UForm class="space-y-4" :schema="schema" :state="state" @submit="onSubmit">
      <UFormField label="Account Number" name="accountNumber">
        <UInput v-model="state.accountNumber" required />
      </UFormField>
      <UFormField label="Initial Balance" name="initialBalance">
        <UInput v-model="state.initialBalance" type="number" required />
      </UFormField>
      <UButton type="submit" color="primary" block :loading="loading">
        Create Account
      </UButton>
      <UAlert v-if="error" color="error" class="mt-2">{{ error }}</UAlert>
    </UForm>
  </UCard>
</template>
