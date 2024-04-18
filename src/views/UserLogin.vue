<script setup>
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import ToastComponent from '@/components/ToastComponent.vue'

const router = useRouter()

const userStore = useUserStore()

const errorMessage = ref('')
const formIsValid = ref(true) // Track the form validity

const form = reactive({
  email: '',
  password: '',
})

const rules = computed(() => {
  return {
    email: {
      required,
      email,
      $rewardearly: true
    },
    password: { required } // Password is required
  }
})

const v$ = useVuelidate(rules, form)

const signInAndRedirect = async () => {
  try {
    await userStore.signIn(form.email, form.password)
    router.push('/tasks')
  } catch (error) {
    if (error.message === 'Email not confirmed') {
      errorMessage.value = 'Email not verified. Verify it and try again.'
      resetErrorMessageAfterDelay(5000)
    } else if (error.message === 'Invalid login credentials') {
      errorMessage.value = 'Invalid credentials. Try again.'
      resetErrorMessageAfterDelay(5000)
    } else {
      errorMessage.value = 'An error occurred. Please try again.'
      resetErrorMessageAfterDelay(5000)
    }
  }
}

function resetErrorMessageAfterDelay(delay) {
  setTimeout(() => {
    errorMessage.value = ''
  }, delay)
}

async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  formIsValid.value = result // Update form validity
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
formIsValid.value = false
  } else {   // If the form is valid, perform some action with the form data
    signInAndRedirect()
  }
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-semibold mt-8">Log in to DoToo</h1>
    <form class="mt-4" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="email" class="block">Email *</label>
        <input type="text" id="email" v-model="form.email" class="w-full border p-2">
        <span v-if="v$.email.$error"><p class="text-red-500 text-sm">{{ v$.email.$errors[0].$message }}</p></span>
      </div>
      <div class="mb-4">
        <label for="password" class="block">Password *</label>
        <input type="password" id="password" v-model="form.password" class="w-full border p-2">
        <span v-if="v$.password.$error" class="block"><p class="text-red-500 text-sm">{{ v$.password.$errors[0].$message }}</p></span>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Log in</button>
      <!-- Display error message if form has errors -->
      <p v-if="!formIsValid" class="text-red-500 text-sm">Fix the errors and try again</p>
    </form>
    <div class="toast toast-top toast-center" v-if="errorMessage">
      <div class="toast-container">
        <transition name="fade">
          <ToastComponent :errorMessage="errorMessage" />
        </transition>
      </div>
    </div>
    <p class="mt-4">Don't have an account? <router-link to="/signup" class="text-blue-500">Sign up</router-link></p>
    <p><router-link to="/forgot-password" class="text-blue-500">Forgot password?</router-link></p>
  </div>
</template>

<style scoped>
.alert {
  gap: 0;
}

.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50; /* Ensure the toast appears above other content */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s; /* Smooth transition for opacity change */
}

.fade-enter, .fade-leave-to {
  opacity: 0; /* Start with 0 opacity during enter and leave transitions */
}

</style>
