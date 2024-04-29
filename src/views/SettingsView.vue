<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useToastStore } from '@/stores/toastStore'
import { required, minLength, helpers, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

import NavBar from '@/components/NavBar.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import EditModal from '@/components/EditModal.vue'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const toastStore = useToastStore()
const isModalVisible = ref(false)
const inputType = ref('text')
const dialogTitle = ref('Edit Name')
const labelTitle = ref('')
const errorMsg = ref('')
const text = ref('')
const validateRule = ref({})
const showErrorInModal = ref(false)

const router = useRouter()

const toastMessage = ref('')

const { hideCompletedSetting, isDarkMode, user, displayName } = storeToRefs(userStore)

const showModal = (value) => {
  isModalVisible.value = value
}

const saveText = async (newText) => {
  try {
    let newData = {}
    if (inputType.value === 'text') {
      newData = { data: { display_name: newText } }
      toastMessage.value = 'Name changed successfully'
      errorMsg.value = 'Couldn\'t update your name. Try again.'
    } else if (inputType.value === 'email') {
      newData = { email: newText }
      toastMessage.value = 'Check your inbox to complete the email change'
      errorMsg.value = 'Couldn\'t update your email. Try again.'
    } else if (inputType.value === 'password') {
      newData = { password: newText }
      toastMessage.value = 'Password changed successfully'
      errorMsg.value = 'Couldn\'t update your password. Try again.'
    }
    await userStore.updateUserData(newData)
    isModalVisible.value = false
    text.value = ''
    toastStore.showToast(true, toastMessage.value)
  } catch (err) {
    showErrorInModal.value = true
    errorMsg.value = err.message
  }
}

const onClickChangeName = () => {
  isModalVisible.value = true
  inputType.value = 'text'
  dialogTitle.value = 'Update name'
  labelTitle.value = 'Full Name *'
  errorMsg.value = 'Name is required'
  text.value = displayName.value
  validateRule.value = {
    required: helpers.withMessage('Name cannot be empty', required)
  }
}

const onClickChangeEmail = () => {
  isModalVisible.value = true
  inputType.value = 'email'
  dialogTitle.value = 'Update email'
  labelTitle.value = 'Email Address *'
  errorMsg.value = 'Enter valid email address'
  text.value = user.value.email
  validateRule.value = {
    required: helpers.withMessage('Email address cannot be empty', required),
    email: helpers.withMessage('Enter correct email address', email)
  }
}

const onClickChangePassword = () => {
  isModalVisible.value = true
  inputType.value = 'password'
  dialogTitle.value = 'Update password'
  labelTitle.value = 'Password *'
  ;(errorMsg.value = 'Password is required'),
    (validateRule.value = {
      required: helpers.withMessage('Password cannot be empty', required),
      minLength: helpers.withMessage('Password must be longer than 6 characters', minLength(6))
    })
}

const handleHideTasksSettingChange = async (value) => {
  try {
    await userStore.updateUserHideCompletedSetting(value)
    if (value) {
      toastStore.showToast(true, 'Enabled hide completed tasks')
    } else {
      toastStore.showToast(true, 'Disabled hide completed tasks')
    }
  } catch (err) {
    toastStore.showToast(false, 'Change failed')
  }
}

const handleDarkModeChange = async (value) => {
  try {
    await userStore.updateDarkMode(value)
    if (value) {
      toastStore.showToast(true, 'Enabled Dark Mode')
      document.documentElement.classList.add('dark')
    } else {
      toastStore.showToast(true, 'Enabled Light Mode')
      document.documentElement.classList.remove('dark')
    }
  } catch (err) {
    toastStore.showToast(false, 'Change theme failed')
  }
}
const onLogoutClick = async () => {
  router.push('/login')
  await userStore.signOut()
}
</script>

<template>
  <NavBar />
  <div class="pt-24 sm:pt-24 max-w-160 mx-auto w-full h-screen">
    <div class="flex-row flex px-6">
      <router-link
        to="/tasks"
        class="bg-transparen hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-10 h-10 p-2 mr-2"
        ><i class="material-icons">arrow_back</i></router-link
      >
      <h1 class="text-3xl font-bold text-left mb-4">Settings</h1>
    </div>
    <div class="pb-6 px-6 overflow-y-auto h-settings sm:h-settings1">
      <div
        class="space-y-6 mb-12 border-2 p-4 border-primary rounded-md bg-white dark:bg-gray-700 shadow-md"
      >
        <p class="text-lg text-left mb-8">Account</p>
        <div>
          <p class="text-left font-bold text-lg">Name</p>
          <div class="flex flex-row justify-between items-center">
            <p class="break-all">{{ displayName }}</p>
            <button
              @click="onClickChangeName"
              class="bg-transparent hover:underline text-primary hover:text-hover rounded-lg text-center font-semibold text-sm"
            >
              Change
            </button>
          </div>
        </div>
        <div>
          <p class="text-left font-bold text-lg">Email</p>
          <div class="flex flex-row justify-between items-center">
            <p class="break-all">{{ user && user.email }}</p>
            <button
              @click="onClickChangeEmail"
              class="bg-transparent hover:underline text-primary hover:text-hover rounded-lg text-center font-semibold text-sm"
            >
              Change
            </button>
          </div>
        </div>
        <div>
          <p class="text-left font-bold text-lg">Password</p>
          <div class="flex flex-row justify-between items-center">
            <p class="break-all">••••••••••••</p>
            <button
              @click="onClickChangePassword"
              class="bg-transparent hover:underline text-primary hover:text-hover rounded-lg text-center font-semibold text-sm"
            >
              Change
            </button>
          </div>
        </div>
      </div>
      <div
        class="space-y-6 mb-12 border-2 p-4 border-primary rounded-md bg-white dark:bg-gray-700 shadow-md"
      >
        <p class="text-lg text-left mb-8">Appearance</p>
        <div class="space-y-4">
          <div class="flex flex-row justify-between items-center">
            <p>Hide completed tasks</p>
            <ToggleSwitch
              :isChecked="hideCompletedSetting"
              @change="handleHideTasksSettingChange"
            />
          </div>
          <div class="flex flex-row justify-between items-center">
            <p>Dark mode</p>
            <ToggleSwitch :isChecked="isDarkMode" @change="handleDarkModeChange" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="block sm:hidden md:hidden lg:hidden fixed bg-white dark:bg-gray-800 p-6 w-full bottom-0"
    >
      <button
        @click="onLogoutClick"
        class="w-full h-14 bg-primary hover:bg-hover text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >
        Log out
      </button>
    </div>
  </div>
  <EditModal
    v-if="isModalVisible"
    :type="inputType"
    :dialogTitle="dialogTitle"
    :labelTitle="labelTitle"
    :errorMsg="errorMsg"
    :show="isModalVisible"
    @show="showModal(value)"
    :value="text"
    :showErrorInModal="showErrorInModal"
    :validateRule="validateRule"
    :save="saveText"
  />
</template>
