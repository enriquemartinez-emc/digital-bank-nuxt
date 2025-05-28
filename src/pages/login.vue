<template>
  <div class="flex justify-center min-h-screen">
    <div class="flex flex-col md:flex-row w-full h-[600px]">
      <!-- Hero Section (Left) -->
      <div
        class="flex-1 flex flex-col items-start justify-start p-8 md:p-12 h-full"
      >
        <h2 class="text-4xl font-extrabold mb-4">Welcome to Digital Bank</h2>
        <p class="text-lg font-medium text-left">
          Your trusted platform for secure, modern banking.<br />
          Effortlessly manage your accounts, track transactions, and experience
          peace of mind—all in one place.
        </p>
      </div>
      <!-- Login Section (Right) -->
      <div
        class="flex-1 flex flex-col items-center justify-start p-8 md:p-12 h-full"
      >
        <div class="w-full flex flex-col items-center flex-1">
          <h1 class="text-2xl font-bold mb-2">Sign in to your account</h1>
          <p class="text-sm mb-8">Access your digital banking dashboard</p>
          <LoginForm />
        </div>
        <div class="mt-8 text-xs text-center">
          <span
            >© {{ new Date().getFullYear() }} Digital Bank. All rights
            reserved.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
