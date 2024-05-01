<template>
  <NavBar />
  <div class="pt-16 max-w-160 mx-auto w-full h-screen flex flex-col">
    <div class="mb-4 sm:pt-16 pt-8 p-6">
      <div class="mb-4 sm:pt-16 flex items-center">
        <router-link
          to="/tasks"
          class="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-10 h-10 p-2 mr-2"
        ><i class="material-icons">arrow_back</i></router-link
        >
        <h1 class="text-3xl flex-grow font-bold text-center mb-4">Settings</h1>
      </div>
      <div class="flex-grow overflow-y-auto">
      <div
        class="space-y-6 mb-12 border-2 p-4 border-primary rounded-md bg-white dark:bg-gray-700 shadow-md"
      >
        <p class="text-lg text-left mb-8">Account</p>
        <div>
          <p class="text-left font-bold text-lg">Name</p>
          <div class="flex flex-row justify-between items-center">
            <p class="break-all">{{ displayName ? displayName : '-' }}</p>
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
            <p class="break-all">{{ user && user.email ? user.email : '-' }}</p>
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
    </div>
  </div>

  <!-- Log out button and container -->
  <div class="block sm:hidden md:hidden lg:hidden fixed bg-secondary dark:bg-gray-800 p-6 w-full bottom-0 inset-x-0">
    <button
      @click="onLogoutClick"
      class="w-full h-12 mb-2 bg-primary hover:bg-hover dark:bg-gray-700 dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-md p-3 hover:shadow-md"
    >
      Log out
    </button>
  </div>

  <EditModal
    v-if="isModalVisible"
    :type="inputType"
    :dialogTitle="dialogTitle"
    :labelTitle="labelTitle"
    :errorMsg="errorMsg"
    :helperText="helperText"
    :show="isModalVisible"
    @show="showModal(value)"
    :value="text"
    :showErrorInModal="showErrorInModal"
    :validateRule="validateRule"
    :save="saveText"
  />
</template>

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
const dialogTitle = ref('')
const labelTitle = ref('')
const helperText = ref('')
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
  labelTitle.value = 'Name (optional)'
  errorMsg.value = 'Name is required'
  helperText.value = 'Leave blank to delete your name'
  text.value = displayName.value
  // validateRule.value = {
  //   required: helpers.withMessage('Name cannot be empty', required)
  // }
}

const onClickChangeEmail = () => {
  isModalVisible.value = true
  inputType.value = 'email'
  dialogTitle.value = 'Update email'
  labelTitle.value = 'Email *'
  text.value = user.value.email
  validateRule.value = {
    required: helpers.withMessage('Enter an email', required),
    email: helpers.withMessage('Use the correct email format', email)
  }
}

const onClickChangePassword = () => {
  isModalVisible.value = true
  inputType.value = 'password'
  dialogTitle.value = 'Update password'
  labelTitle.value = 'Password *'
  helperText.value = 'Minimum 6 characters'
  ;(errorMsg.value = 'Password is required'),
    (validateRule.value = {
      required: helpers.withMessage('Enter a password', required),
      minLength: helpers.withMessage('The password must be at least 6 characters', minLength(6))
    })
}

const handleHideTasksSettingChange = async (value) => {
  try {
    await userStore.updateUserHideCompletedSetting(value)
    if (value) {
      toastStore.showToast(true, 'Completed tasks hidden')
    } else {
      toastStore.showToast(true, 'Completed tasks shown')
    }
  } catch (err) {
    toastStore.showToast(false, 'Couldn\'t change tasks appearance')
  }
}

const handleDarkModeChange = async (value) => {
  try {
    await userStore.updateDarkMode(value)
    if (value) {
      toastStore.showToast(true, 'Dark mode on')
      document.documentElement.classList.add('dark')
    } else {
      toastStore.showToast(true, 'Dark mode off')
      document.documentElement.classList.remove('dark')
    }
  } catch (err) {
    toastStore.showToast(false, 'Couldn\'t change theme')
  }
}

const onLogoutClick = async () => {
  router.push('/login')
  await userStore.signOut()
}
</script>
