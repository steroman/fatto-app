<script setup>
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

// const signIn = () => {
//   userStore.signIn(form.email, form.password)
// }

const form = reactive({
  password: ''
})

const rules = computed(() => {
  return {
    // name: { required }, // Name is required
    password: {
      required // Email is required
    } // Password is required
  }
})

const v$ = useVuelidate(rules, form)

const updatePassword = async () => {
  await userStore.updateUserPassword(form.password)
  confirmationSent.value = true
}

const confirmationSent = ref(false)

async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    alert('The form has errors')
  } else {
    // If the form is valid, perform some action with the form data
    updatePassword()
  }
}
</script>
<template>
  <div class="container mx-auto" v-show="!confirmationSent">
    <h1 class="text-2xl font-semibold mt-8">Update password</h1>
    <p class="text-sm mt-2">Enter your new password.</p>
    <form class="mt-4" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="password" class="block">New password *</label>
        <input type="password" id="password" v-model="form.password" class="w-full border p-2" />
        <span v-if="v$.password.$error" class="block"> {{ v$.password.$errors[0].$message }}</span>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Update password</button>
    </form>
    <!-- <p class="mt-4"><router-link to="/login" class="text-blue-500">Back to log in</router-link></p> -->
  </div>
  <div v-if="confirmationSent" class="container mx-auto">
    <h2 class="text-xl font-semibold mt-8">Password updated</h2>
    <p class="text-sm mt-2">You're ready to get back to your tasks.</p>
    <button @click="router.push('/tasks')" class="bg-blue-500 text-white px-4 py-2 mt-4">
      Go to tasks
    </button>
  </div>
</template>

<style scoped></style>
