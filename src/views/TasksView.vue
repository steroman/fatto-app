<script setup>
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import CreateTask from '@/components/CreateTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useUserStore } from '@/stores/userStore'
import SortTasks from '@/components/SortTasks.vue'
import { storeToRefs } from 'pinia'
import EditModal from '@/components/EditModal.vue'

const tasksStore = useTasksStore()
const userStore = useUserStore()

const { taskSortered } = storeToRefs(tasksStore)
const { user } = storeToRefs(userStore)

// State for edit modal
const isEditModalVisible = ref(false)
const editedTask = ref(null)
const editedTitle = ref('')

onMounted(async () => {
  await userStore.fetchUserHideCompletedSetting()
  await userStore.fetchUserSortingPreference()
  await tasksStore.fetchAllTasks()
})

// Methods for handling the edit modal
const openEditModal = (task) => {
  editedTask.value = task
  editedTitle.value = task.title
  isEditModalVisible.value = true
}

const saveEditedTask = async () => {
  if (editedTask.value) {
    const taskToUpdate = {
      ...editedTask.value,
      title: editedTitle.value
    }
    await tasksStore.updateExistingTask(taskToUpdate)
  }
  isEditModalVisible.value = false
}

const cancelEditModal = () => {
  isEditModalVisible.value = false
}

</script>

<template>
  <main class="container mx-auto">
    <h1 class="text-3xl font-semibold mb-4">{{ userStore.displayName ? userStore.displayName + "'s tasks" : "Your tasks" }}</h1>
    <template v-if="user">
      <CreateTask />
    </template>
    <template v-if="taskSortered && taskSortered.length">
      <p class="mb-2">Total tasks: {{ taskSortered.length }}</p>
      <div class="sorting-tools flex justify-between">
        <SortTasks />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskCard v-for="task in taskSortered" :key="task.id" :task="task" @editTask="openEditModal(task)" />
      </div>
    </template>
    <template v-else>
      <p v-if="!user">Loading account information...</p>
      <p v-else-if="!taskSortered">Loading tasks...</p>
      <p v-else>No tasks available.</p>
    </template>
    <button><router-link to="/settings" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Settings</router-link></button>

    <!-- Edit modal -->
    <EditModal
      v-if="isEditModalVisible"
      :isVisible="isEditModalVisible"
      modalTitle="Edit Task Title"
      inputPlaceholder="Enter new title"
      type="text"
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      :value="editedTitle"
      @input="editedTitle = $event.target.value"
      @save="saveEditedTask"
      @cancel="cancelEditModal"
    />
  </main>
</template>

<style scoped>

</style>
