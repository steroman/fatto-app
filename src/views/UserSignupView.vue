<script setup>
// Import necessary Vue functions and components
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'

// Initialize user store
const userStore = useUserStore()

// Define reactive variables and states
const message = ref('')
const formIsValid = ref(true)

// Define reactive form fields
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Define form validation rules
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email address cannot be empty', required),
      email: helpers.withMessage('Enter correct email address', email)
    }, // Email is required and must be a valid email address
    password: {
      required: helpers.withMessage('Password cannot be empty', required),
      minLength: helpers.withMessage('Password must be longer than 6 characters', minLength(6))
    }, // Password is required
    confirmPassword: {
      required: helpers.withMessage('Confirm password cannot be empty', required),
      sameAsPassword: helpers.withMessage('Retype password', sameAs(form.password))
    } // Password confirmation is required
  }
})

// Initialize vuelidate with form and rules
const v$ = useVuelidate(rules, form)

// Initialize confirmationSent flag
const confirmationSent = ref(false)

// Function to handle sign-up submission
async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  formIsValid.value = result // Update form validity
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    formIsValid.value = false
    message.value = 'Fix errors and try again.'
  } else {
    // If the form is valid, perform some action with the form data
    try {
      await signUp()
    } catch (err) {
      message.value = 'An error occurred. Please try again.'
      formIsValid.value = false
    }
  }
}

// Function to sign up the user
async function signUp() {
  try {
    confirmationSent.value = true
    await userStore.createUser(form.email, form.password, form.name)
  } catch (error) {
    message.value = error.message
    formIsValid.value = false
  }
}
</script>

<template>
  <!-- Main container -->
  <div class="pt-16 px-6 max-w-120 mx-auto w-full h-screen" v-if="!confirmationSent">
    <!-- Logo and welcome message -->
    <img src="@/assets/logo.svg" class="w-12 mx-auto mb-4" />
    <h1 class="text-3xl font-bold text-center mb-2">Welcome to Fatto</h1>
    <p class="text-lg text-center mb-4">Create an account to start using Fatto for free.</p>
    <!-- Sign-up form -->
    <form @submit.prevent="handleSubmit" class="pb-10">
      <div class="space-y-4 mb-6">
        <!-- Name input -->
        <div class="space-y-1">
          <label class="font-medium text-lg text-left w-full block" for="name"
            >Name (optional)</label
          >
          <input
            type="text"
            v-model="form.name"
            id="name"
            :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none`"
          />

        </div>
        <!-- Email input -->
        <div class="space-y-1">
          <label class="font-medium text-lg text-left w-full block" for="email">Email *</label>
          <input
            type="text"
            v-model="form.email"
            id="email"
            :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.email.$error ? 'outline-red-300' : ''} ${v$.email.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
          />
          <span v-if="v$.email.$error" class="block text-red-500 text-sm text-left">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
        <!-- Password input -->
        <div class="space-y-1">
          <label class="font-medium text-lg text-left w-full block" for="password"
            >Password *</label
          >
          <input
            type="password"
            v-model="form.password"
            :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.password.$error ? 'outline-red-300' : ''} ${v$.password.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
          />
          <span
            v-if="!v$.password.$error && !v$.password.$errors.length"
            class="block text-sm text-left"
            >Minimum 6 characters</span
          >
          <span v-if="v$.password.$error" class="block text-red-500 text-sm text-left">{{
            v$.password.$errors[0].$message
          }}</span>
        </div>
        <!-- Confirm Password input -->
        <div class="space-y-1">
          <label class="font-medium text-lg text-left w-full block" for="cofirm-password"
            >Confirm password *</label
          >
          <input
            type="password"
            v-model="form.confirmPassword"
            id="confirm-password"
            :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.confirmPassword.$error ? 'outline-red-300' : ''} ${v$.confirmPassword.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
          />
          <span v-if="v$.confirmPassword.$error" class="block text-red-500 text-sm text-left">{{
            v$.confirmPassword.$errors[0].$message
          }}</span>
        </div>
      </div>
      <!-- Sign-up button -->
      <button
        type="submit"
        class="w-full h-14 mb-2 bg-primary dark:bg-gray-700 hover:bg-hover dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >
        Sign up
      </button>
      <!-- Error message -->
      <span
        :class="['block text-red-500 text-sm text-center', formIsValid ? 'invisible' : 'visible']"
        >{{ message }}</span
      >
      <!-- Login link -->
      <p class="mb-2 mt-2">
        Already got an account?
        <router-link to="/login" class="px-1 text-primary hover:text-hover">Log in</router-link>
      </p>
    </form>
  </div>
  <!-- Confirmation message -->
  <div class="pt-10 px-6 max-w-120 mx-auto w-full h-screen" v-if="confirmationSent">
    <h1 class="text-3xl font-bold text-center mb-4">Check your inbox</h1>
    <p class="text-lg text-center mb-8">
      We sent an email to <strong>{{ form.email }}</strong
      >. <br />Open the link in the email to verify your account and start using Fatto.
    </p>
    <!-- Home link -->
    <router-link
      to="/"
      class="w-full h-14 block bg-primary hover:bg-hover text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >Go back home</router-link
    >
  </div>
</template>
