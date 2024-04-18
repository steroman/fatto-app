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

const form = reactive({
  email: '',
  password: '',
})

const rules = computed(() => {
  return {
    email: {
      required,
      email
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
      errorMessage.value = 'This email isn\'t verified yet. Check your inbox and try to login again.'
      resetErrorMessageAfterDelay(3000) // 3000 milliseconds (3 seconds)
    } else if (error.message === 'Invalid login credentials') {
      errorMessage.value = 'Invalid email or password. Try again.'
    } else {
      errorMessage.value = 'An error occurred. Please try again.'
      resetErrorMessageAfterDelay(3000) // 3000 milliseconds (3 seconds)
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
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    alert('The form has errors')
    
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
            <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
        </div>
        <div class="mb-4">
            <label for="password" class="block">Password *</label>
            <input type="password" id="password" v-model="form.password" class="w-full border p-2">
            <span v-if="v$.password.$error" class="block"> {{ v$.password.$errors[0].$message }}</span>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2">Log in</button>
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