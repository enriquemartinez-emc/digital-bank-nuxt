<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { form, loading, error, login, checkAuth } = useAuth();

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
type Schema = z.infer<typeof schema>;

const state = reactive({
  username: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value.username = event.data.username;
  form.value.password = event.data.password;
  const success = await login();
  if (success) {
    window.location.href = "/";
  }
}
</script>

<template>
  <UCard class="max-w-md mx-auto">
    <UForm class="space-y-4" :schema="schema" :state="state" @submit="onSubmit">
      <UFormField label="Username" name="username">
        <UInput v-model="state.username" required />
      </UFormField>
      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" required />
      </UFormField>
      <UButton type="submit" color="primary" block :loading="loading">
        Login
      </UButton>
      <UAlert
        v-if="error"
        color="error"
        title="Login failed"
        :description="error"
        icon="i-lucide-alert-triangle"
        class="mt-2"
      />
    </UForm>
  </UCard>
</template>
