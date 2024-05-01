<script setup>

</script>


<template>
  <div class="pt-28 px-6 max-w-120 mx-auto w-full h-screen">
    <div class="mb-4 pt-8">
            <div class="w-full">
              <img src="@/assets/logo-broken.svg" class="w-48 mx-auto mb-8" />
              <h1 class="text-3xl font-bold mb-4 text-center w-full">Page not found</h1>
              <p class="text-lg text-center mb-8">It looks like you landed on a page that doesn't exist yet. </p>
              <button
        class="w-full h-14 mt-2 bg-primary dark:bg-gray-700 hover:bg-hover dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >              <router-link to="/">Go back home</router-link>
      </button>
      </div>
          </div>
    </div>
</template>

<style scoped>

</style>