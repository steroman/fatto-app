<script setup></script>

<template>
  <div class="pt-20 max-w-96 p-7 mx-auto">
    <h1 class="text-3xl font-bold text-center mb-4">
      Get things done with <span class="text-primary font-black">Fatto</span>
    </h1>
    <p class="text-lg text-center mb-4">Your simple and effective to-do list app.</p>
    <img src="@/assets/home-illustration.svg" alt="Fatto Logo" class="w-64 mx-auto mb-8" />
    <router-link
      to="/signup"
      class="w-full h-14 block bg-primary dark:bg-gray-700 hover:bg-hover dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >Get Started</router-link
    >
    <p class="my-2 text-center">
      Already have an account?
      <router-link to="/login" class="px-1 text-primary hover:text-hover">Log in</router-link>
    </p>
  </div>
</template>
