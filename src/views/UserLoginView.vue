<script setup>
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useToastStore } from '@/stores/toastStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const toastStore = useToastStore()

const message = ref('')
const success = ref(true)

const form = reactive({
  email: '',
  password: ''
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email address cannot be empty', required),
      email: helpers.withMessage('Enter correct email address', email)
    },
    password: {
      required: helpers.withMessage('Password cannot be empty', required)
    }
  }
})

const v$ = useVuelidate(rules, form)

const signInAndRedirect = async () => {
  try {
    await userStore.signIn(form.email, form.password)
    router.push('/tasks')
    toastStore.showToast(true, 'Login successful')
  } catch (error) {
    if (error.message === 'Email not confirmed') {
      message.value = 'Email not verified. Verify it and try again.'
    } else if (error.message === 'Invalid login credentials') {
      message.value = 'Wrong credentials. Try again.'
    } else {
      message.value = 'An error occurred. Please try again.'
    }
    success.value = false
  }
}

async function handleSubmit() {
  const result = await v$.value.$validate()
  if (!result) {
    message.value = 'Fix errors and try again.'
    success.value = false
  } else {
    success.value = true
    signInAndRedirect()
  }
}
</script>

<template>
  <div class="pt-16 px-6 max-w-120 mx-auto w-full h-screen">
    <!-- Logo and title -->
    <img src="@/assets/logo.svg" class="w-48 mx-auto mb-8" />
    <h1 class="text-3xl font-bold text-center mb-2">Log in to Fatto</h1>

    <!-- Login form -->
    <form @submit.prevent="handleSubmit" class="pb-28">
      <div class="space-y-4 mb-6 mt-4">
        <!-- Email input -->
        <div class="space-y-1">
          <label class="font-medium text-lg text-left w-full block" for="email">Email *</label>
          <input
            type="text"
            v-model="form.email"
            id="email"
            :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.email.$error ? 'outline-red-300' : ''} ${v$.email.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
          />
          <span v-if="v$.email.$error" class="block text-red-500 text-sm text-left">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>

        <!-- Password input -->
        <div class="space-y-1">
          <label class="font-medium text-lg text-left w-full block" for="password">Password *</label>
          <input
            type="password"
            v-model="form.password"
            id="password"
            :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.email.$error ? 'outline-red-300' : ''} ${v$.email.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
            placeholder="Enter your Password"
          />
          <span v-if="v$.password.$error" class="block text-red-500 text-sm text-left">
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>
      </div>

      <!-- Login button -->
      <button
        class="w-full h-14 mt-2 bg-primary dark:bg-gray-700 hover:bg-hover dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >
        Log in
      </button>

      <!-- Error message -->
      <span :class="['block text-red-500 text-sm text-center mt-2', success.value ? 'invisible' : 'visible']">
        {{ message }}
      </span>

      <!-- Navigation links -->
      <div class="py-4">
        <p class="mb-2">No account? <router-link to="/signup" class="text-primary hover:text-hover">Sign up</router-link></p>
        <p>Forgot password? <router-link to="/forgot-password" class="text-primary hover:text-hover">Reset it</router-link></p>
      </div>
    </form>
  </div>
</template>