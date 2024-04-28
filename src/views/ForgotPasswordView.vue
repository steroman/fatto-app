<script setup>
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

// const signIn = () => {
//   userStore.signIn(form.email, form.password)
// }

const form = reactive({
  email: ''
})

const rules = computed(() => {
  return {
    // name: { required }, // Name is required
    email: {
      required, // Email is required
      email // Must be a valid email address
    } // Password is required
  }
})

const v$ = useVuelidate(rules, form)

const confirmationSent = ref(false)

const resetPassword = async () => {
  await userStore.resetPassword(form.email)
  confirmationSent.value = true
}

async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    alert('The form has errors')
  } else {
    // If the form is valid, perform some action with the form data
    resetPassword()
  }
}
</script>
<template>
  <div class="container mx-auto" v-show="!confirmationSent">
    <h1 class="text-2xl font-semibold mt-8">Reset password</h1>
    <p class="text-sm mt-2">
      Enter your email address and we'll send you a link to reset your password.
    </p>
    <form class="mt-4" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="email" class="block">Email *</label>
        <input type="text" id="email" v-model="form.email" class="w-full border p-2" />
        <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Send link</button>
    </form>
    <p class="mt-4"><router-link to="/login" class="text-blue-500">Back to log in</router-link></p>
  </div>
  <div v-if="confirmationSent" class="container mx-auto">
    <h2 class="text-xl font-semibold mt-8">Check your inbox</h2>
    <p class="text-sm mt-2">
      If an account associated with that email exists, you'll receive an email to help you reset
      your password shortly.
    </p>
    <button @click="router.push('/')" class="bg-blue-500 text-white px-4 py-2 mt-4">
      Go back home
    </button>
  </div>
</template>

<style scoped></style>
