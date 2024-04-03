<script setup></script>

<template>
    <div class="bg-white min-h-screen flex flex-col justify-center items-center">
      <div class="max-w-lg mx-auto px-4 py-8">
        <img src="@/assets/logo.svg" alt="DoToo Logo" class="w-20 mx-auto mb-4">
        <h1 class="text-3xl font-semibold text-center mb-4">Welcome to DoToo</h1>
        <p class="text-lg text-center mb-8">Your simple and effective to-do list app.</p>
        <div class="flex flex-col space-y-4 items-center">
          <router-link to="/signup" class="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded text-center">Get started</router-link>
          <p class="mt-4 text-center">Already have an account? <router-link to="/login" class="text-blue-500">Sign in</router-link></p>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  </style>