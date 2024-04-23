<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import EditModal from '@/components/EditModal.vue'

const router = useRouter()
const userStore = useUserStore()
const { user, displayName, hideCompletedSetting } = storeToRefs(userStore)

let v$ = null
const _modalData = {
  name: {
    title: 'Update name',
    placeholder: 'Enter new name',
    type: 'text',
  },
  email: {
    title: 'Update email',
    placeholder: 'Enter new email',
    type: 'email',
  },
  password: {
    title: 'Update password',
    placeholder: 'Enter new password',
    type: 'password',
    helperText: 'Password must be at least 6 characters',
  }
}

const newHideCompletedSetting = ref(hideCompletedSetting.value)

const form = ref({
  name: '',
  email: '',
  password: ''
})
const inputValidationSelected = ref('')
const hasSavedData = ref(false)
const formIsValid = ref(true) // Track the form validity
const modalVisibleType = ref(null)
const inputErrorMessage = ref(null)

const rules = computed(() => {
  if (inputValidationSelected.value === 'email') {
    return {
      email: { required, email }
    }
  }

  if (inputValidationSelected.value === 'password') {
    return {
      password: { required, minLength: minLength(6) }
    }
  }

  return {}
})

async function _handleInputSubmit(newValue, inputType) {
  inputValidationSelected.value = inputType
  v$ = useVuelidate(rules, form)

  hasSavedData.value = true

  await validateInput(newValue, inputType)

  if (formIsValid.value) {
    await updateUserInfo(form.value[inputType], inputType)
  }
}

const validateInput = async (newValue, inputType) => {
  form.value[inputType] = newValue

  if (hasSavedData.value) {
    const result = await v$?.value.$validate()
    formIsValid.value = result // Update form validity
    if (!result) {
      inputErrorMessage.value = v$?.value[inputType]
        ? v$?.value[inputType].$error
          ? v$?.value[inputType].$errors[0].$message
          : ''
        : ''
      formIsValid.value = false
      return
    }

    inputErrorMessage.value = ''
    formIsValid.value = true
  }
}

const showNameModal = () => {
  modalVisibleType.value = 'name'
  form.value.name = displayName.value
}

const showPasswordModal = () => {
  modalVisibleType.value = 'password'
}

const showEmailModal = () => {
  modalVisibleType.value = 'email'
  form.value.email = user.value.email
}

const logOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

const updateUserInfo = async (newValue, inputType) => {
  try {
    let newData = {}

    if (inputType === 'email') {
      newData = { email: newValue }
    } else if (inputType === 'name') {
      newData = { data: { display_name: newValue } }
    } else if (inputType === 'password') {
      newData = { password: newValue }
    }

    await userStore.updateUserData(newData)
    modalVisibleType.value = null
    hasSavedData.value = false

    form.value[inputType] = ''
    inputErrorMessage.value = ''
    formIsValid.value = true
  } catch (err) {
    inputErrorMessage.value = err.message
    formIsValid.value = false
  }
}

// Listen for the 'cancel' event emitted by EditModal and handle it
const cancelEditModal = () => {
  modalVisibleType.value = null
}
</script>

<template>
  <main class="container mx-auto" v-if="user">
    <div class="flex items-center justify-start mb-4">
      <router-link to="/tasks" class="flex items-center text-gray-600 hover:text-gray-800">
        <svg
          class="h-6 w-6 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
      </router-link>
      <h1 class="text-3xl font-semibold">Settings</h1>
    </div>
    <div class="flex flex-col w-full">
      <div>
        <h2 class="text-2xl font-medium">Account</h2>
        <p class="text-gray-600">Update your information</p>
        <div>
          <p class="py-2 text-xl font-semibold">Name</p>
          <div class="flex items-center justify-between mb-4">
            <p class="text-gray-600">{{ displayName ? displayName : '-' }}</p>
            <button
              @click="showNameModal()"
              class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
            >
              Change
            </button>
          </div>
        </div>

        <div>
          <p class="py-2 text-xl font-semibold">Email Address</p>
          <div class="flex items-center justify-between mb-4">
            <p class="text-gray-600">{{ user.email }}</p>
            <button
              @click="showEmailModal()"
              class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
            >
              Change
            </button>
          </div>
          <div>
            <p class="py-2 text-xl font-semibold">Password</p>
            <div class="flex items-center justify-between mb-4">
              <p class="text-gray-600">••••••••••••</p>
              <button
                @click="showPasswordModal()"
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="flex flex-col w-full">
      <div>
        <h2 class="text-2xl font-medium">Appearance</h2>
        <p class="text-gray-600">Customise what tasks you see</p>
      </div>
      <div class="mt-8">
        <div class="flex items-center mb-4">
          <label for="hideCompleted" class="text-gray-600 cursor-pointer"
            >Hide completed tasks</label
          >
          <input
            type="checkbox"
            class="toggle toggle-accent mr-2"
            id="hideCompleted"
            v-model="newHideCompletedSetting"
            @change="userStore.updateUserHideCompletedSetting(newHideCompletedSetting)"
          />
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="flex flex-col w-full">
      <button @click="logOut()" class="btn btn-danger">Logout</button>
    </div>

    <EditModal
      v-if="modalVisibleType !== null"
      :isVisible="modalVisibleType !== null"
      :modalTitle="_modalData[modalVisibleType].title"
      :inputPlaceholder="_modalData[modalVisibleType].placeholder"
      :type="_modalData[modalVisibleType].type"
      :helperText="_modalData[modalVisibleType].helperText"
      :errorMessage="inputErrorMessage"
      :defaultValue="form[modalVisibleType]"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      @input="validateInput($event.target.value, modalVisibleType)"
      @save="_handleInputSubmit($event, modalVisibleType)"
      @cancel="cancelEditModal"
    />
  </main>
</template>

<style scoped>
/* Your scoped styles */
</style>
