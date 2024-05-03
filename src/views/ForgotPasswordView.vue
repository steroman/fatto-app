<template>
  <!-- Form for resetting password -->
  <div class="pt-16 px-6 max-w-120 mx-auto w-full h-screen" v-if="!confirmationSent">
    <!-- Title and description -->
    <h1 class="text-3xl font-bold text-center mb-2">Password forgotten</h1>
    <p class="text-lg text-center mb-8">
      Enter your email and we'll send you a link to reset your password.
    </p>
    <!-- Form for email input -->
    <form @submit.prevent="handleSubmit" class="mb-4">
      <div class="space-y-1">
        <label class="font-medium text-lg text-left w-full block" for="email">Email *</label>
        <!-- Email input field -->
        <input
          type="text"
          v-model="form.email"
          id="email"
          :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.email.$error ? 'outline-red-300' : ''} ${v$.email.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
        />
        <!-- Display error message if email validation fails -->
        <span v-if="v$.email.$error" class="block text-red-500 text-sm text-left">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>

      <!-- Button to submit form -->
      <button
        type="submit"
        class="w-full h-14 mt-10 bg-primary dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-hover text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >
        Send link
      </button>
      <!-- Display error message if sending fails -->
      <span
        :class="['block text-red-500 text-sm text-center', success ? 'invisible' : 'visible']"
        >{{ message }}</span
      >
    </form>

    <!-- Link to go back to login -->
    <router-link to="/login" class="text-primary hover:text-hover">Back to log in</router-link>
  </div>

  <!-- Display after confirmation sent -->
  <div class="pt-20 md:max-w-96 mx-auto lg:max-w-96 w-10/12 sm:w-8/12" v-if="confirmationSent">
    <h2 class="text-xl font-semibold mt-8">Check your inbox</h2>
    <p class="text-lg mt-4 mb-5">
      If an account associated with that email exists, you'll receive an email to help you reset
      your password shortly.
    </p>
    <!-- Link to go back home -->
    <router-link to="/" class="text-primary hover:text-hover">Go back home</router-link>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core' // Import validation functions
import { required, email, helpers } from '@vuelidate/validators' // Import validators
import { useUserStore } from '@/stores/userStore' // Import user store

// Initialize user store
const userStore = useUserStore()

// Reactive form object
const form = reactive({
  email: ''
})

// Ref for message and success status
const message = ref('')
const success = ref(false)

// Computed rules for form validation
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email address cannot be empty', required),
      email: helpers.withMessage('Enter correct email address', email)
    }
  }
})

// Vuelidate instance
const v$ = useVuelidate(rules, form)

// Ref for confirmation status
const confirmationSent = ref(false)

// Function to reset password
const resetPassword = async () => {
  try {
    await userStore.resetPassword(form.email)
    confirmationSent.value = true
    success.value = true
  } catch (err) {
    message.value = err.message
    success.value = false
  }
}

// Handle form submission
async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (result) {
    resetPassword()
  } else {
    message.value = 'Fix error and try again.'
    success.value = false
  }
}
</script>
