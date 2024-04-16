<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import EditModal from '@/components/EditModal.vue'

const router = useRouter()
const userStore = useUserStore()
const { user, displayName } = storeToRefs(userStore)

const isVisible = ref(false)
const newName = ref('')

const showEditModal = () => {
  isVisible.value = true
  newName.value = displayName.value
}

const { hideCompletedSetting } = storeToRefs(userStore)
const newHideCompletedSetting = ref(hideCompletedSetting.value)

const logOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

const updatePassword = async () => {
  await userStore.updateUserData({ password: form.password })
  // confirmationSent.value = true
}

const updateName = async (newName) => {
  await userStore.updateUserData({ data: {
    display_name: newName }})
  isVisible.value = false
}

// Listen for the 'cancel' event emitted by EditModal and handle it
const cancelEditModal = () => {
  isVisible.value = false // Update isVisible to hide the modal when canceled
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
              @click="showEditModal()"
              class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
            >
              Change
            </button>
          </div>
        </div>
        <EditModal
          :isVisible="isVisible"
          modalTitle="Edit Name"
          inputPlaceholder="Enter new name"
          saveButtonLabel="Save"
          cancelButtonLabel="Cancel"
          :defaultValue="displayName"
          :value="newName"
          @input="newName = $event.target.value"
          @save="updateName"
          @cancel="cancelEditModal"
        />

        <div>
          <p class="py-2 text-xl font-semibold">Email Address</p>
          <div class="flex items-center justify-between mb-4">
            <p class="text-gray-600">{{ user.email }}</p>
            <button class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
              Change
            </button>
          </div>
          <div>
            <p class="py-2 text-xl font-semibold">Password</p>
            <div class="flex items-center justify-between mb-4">
              <p class="text-gray-600">sahukjdkjashdhg</p>
              <button
                @click="_handleChangePass"
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
              >
                Change
              </button>
            </div>
          </div>
        </div>
        <div>
          <p class="py-2 text-xl font-semibold">Email Address</p>
          <div class="flex items-center justify-between mb-4">
            <p class="text-gray-600">{{ user.email }}</p>
            <button class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
              Change
            </button>
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
  </main>
</template>

<style scoped>
/* Your scoped styles */
</style>
