<script setup>
// No need for imports or explicit variable declarations in <script setup>
</script>

<template>
  <!-- Main content container -->
  <div class="pt-20 max-w-96 p-7 mx-auto">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-center mb-4">
      <!-- Fatto Logo -->
      <img src="@/assets/logo.svg" alt="Fatto Logo" class="w-64 mx-auto mb-8" />

      <!-- App Name -->
      Get things done with <span class="text-primary font-black">Fatto</span>
    </h1>
    <!-- Description -->
    <p class="text-lg text-center mb-4">Your simple and effective to-do list app.</p>
    <!-- Button to navigate to signup -->
    <router-link
      to="/signup"
      class="w-full h-14 block bg-primary dark:bg-gray-700 hover:bg-hover dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
    >
      Get Started
    </router-link>
    <!-- Login prompt -->
    <p class="my-2 text-center">
      Already have an account?
      <!-- Link to navigate to login -->
      <router-link to="/login" class="px-1 text-primary hover:text-hover">Log in</router-link>
    </p>
  </div>
</template>
