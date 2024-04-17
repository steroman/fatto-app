<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import EditModal from '@/components/EditModal.vue'

const router = useRouter()
const userStore = useUserStore()
const { user, displayName } = storeToRefs(userStore)

const isNameModalVisible = ref(false)
const isPasswordModalVisible = ref(false)
const isEmailModalVisible = ref(false)
const newName = ref('')
const newPassword = ref('')
const newEmail = ref('')

const showNameModal = () => {
  isNameModalVisible.value = true
  newName.value = displayName.value
}

const showPasswordModal = () => {
  isPasswordModalVisible.value = true
  newPassword.value = '' // Clear any previously entered password
}

const showEmailModal = () => {
  isEmailModalVisible.value = true
  newEmail.value = '' // Clear any previously entered password
}

const { hideCompletedSetting } = storeToRefs(userStore)
const newHideCompletedSetting = ref(hideCompletedSetting.value)

const logOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

const updatePassword = async (newPassword) => {
  await userStore.updateUserData({ password: newPassword })
  isPasswordModalVisible.value = false
  // confirmationSent.value = true
}

const updateName = async (newName) => {
  await userStore.updateUserData({
    data: {
      display_name: newName
    }
  })
  isNameModalVisible.value = false
}

const updateEmail = async (newEmail) => {
  await userStore.updateUserData({ email: newEmail })
  isEmailModalVisible.value = false
    }

// Listen for the 'cancel' event emitted by EditModal and handle it
const cancelEditModal = () => {
  isNameModalVisible.value = false
  isPasswordModalVisible.value = false
  isEmailModalVisible.value = false
}
// const _handleChangePass = async () => {
//   try {
//     await userStore.changePassword('1234567890', '123456')
//     alert('Password changed successfully')
//   } catch(err) {
//     console.error(err)
//   }
// }
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
            <p class="text-gray-600">{{ displayName }}</p>
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
            <button @click="showEmailModal()" class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
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
      <div class="divider"></div>
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
    </div>
    <button @click="logOut()" class="btn btn-danger">Logout</button>
    <div class="mt-8">
      <div class="flex items-center mb-4">
        <input
          type="checkbox"
          class="toggle toggle-accent mr-2"
          id="hideCompleted"
          v-model="newHideCompletedSetting"
          @change="userStore.updateUserHideCompletedSetting(newHideCompletedSetting)"
        />
        <label for="hideCompleted" class="text-lg cursor-pointer">Hide completed tasks</label>
      </div>
    </div>
    <!-- Name modal -->

    <EditModal
      v-if="isNameModalVisible"
      :isVisible="isNameModalVisible"
      modalTitle="Update name"
      inputPlaceholder="Enter new name"
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      :defaultValue="displayName"
      :value="newName"
      @input="newName = $event.target.value"
      @save="updateName"
      @cancel="cancelEditModal"
    />

    <!-- Password modal -->
    <EditModal
      v-if="isPasswordModalVisible"
      :isVisible="isPasswordModalVisible"
      modalTitle="Update password"
      inputPlaceholder="Enter new password"
      type="password"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      :value="newPassword"
      @input="newPassword = $event.target.value"
      @save="updatePassword"
      @cancel="cancelEditModal"
    />

    <!-- Email modal-->

    <EditModal
      v-if="isEmailModalVisible"
      :isVisible="isEmailModalVisible"
      modalTitle="Update email"
      inputPlaceholder="Enter new email"
      type="email"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      :defaultValue="user.email"
      :value="newEmail"
      @input="newEmail = $event.target.value"
      @save="updateEmail"
      @cancel="cancelEditModal"
    />
  </main>
</template>

<style scoped>
/* Your scoped styles */
</style>
