<template>
  <div class="pt-28 px-6 max-w-120 mx-auto w-full h-screen">
      <div v-if="!confirmationSent">
          <h1 class="text-2xl font-bold text-center mb-4">Update password</h1>
          <form @submit.prevent="handleSubmit">
              <div class="space-y-4 mb-6">
                  <div class="space-y-1">
                      <label class="font-medium text-lg text-left w-full block" for="password">New password *</label>
                          <input type="password" v-model="form.password" id="password"
                              :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.password.$error ? 'outline-red-300' : ''} ${v$.password.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"/>
                          <span v-if="v$.password.$error" class="block text-red-500 text-sm text-left">{{ v$.password.$errors[0].$message}}</span>
                      </div>
                  <div class="space-y-1">
                      <label class="font-medium text-lg text-left w-full block" for="newpassword">Confirm new password *</label>
                      <input type="password" v-model="form.password1" id="newpassword"
                          :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.password1.$error ? 'outline-red-300' : ''} ${v$.password1.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"/>
                      <span v-if="v$.password1.$error" class="block text-red-500 text-sm text-left">{{ v$.password1.$errors[0].$message }}</span>
                  </div>
              </div>
              <button
                  class="w-full h-14 mt-6 bg-primary hover:bg-hover text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md">Update password</button>
              <span :class="['block text-red-500 text-sm text-left', success ? 'invisible' : 'visible']">{{message}}</span>
          </form>
      </div>
      <div v-if="confirmationSent">
          <h1 class="text-3xl font-bold text-center mb-4">Password updated</h1>
          <p class="text-lg text-center mb-8">You're ready to get back to your tasks.</p>
          <router-link to="/tasks"
              class="w-full h-14 block bg-primary hover:bg-hover text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md">Go to tasks</router-link>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { helpers, minLength, required, sameAs } from '@vuelidate/validators'

const userStore = useUserStore()

const confirmationSent = ref(false)

const message = ref("")
const success = ref(true)


const form = reactive({
  password: '',
  password1: ''
})

const rules = computed(() => {
  return {
      password: {
          required: helpers.withMessage('Password cannot be empty', required),
          minLength: helpers.withMessage('Password must be longer than 6 characters', minLength(6))
      }, // Password is required
      password1: {
          required: helpers.withMessage('Cofirm password cannot be empty', required),
          sameAsPassword: helpers.withMessage('Retype password', sameAs(form.password))
      } // Password confirmation is required
  }
})

const v$ = useVuelidate(rules, form)

const updatePassword = async () => {
  try {
      await userStore.updateUserData({ password: form.password })
      confirmationSent.value = true
  } catch (err) {
      message.value = err.message
      success.value = false
  }
}

const handleSubmit = async () => {
  success.value = true
  const result = await v$.value.$validate()
  if (result) {
      success.value = true
      updatePassword()
  } else {
      message.value = "Fix errors and try again."
      success.value = false
  }
}

</script>