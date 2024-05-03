<script setup>
// Import Vue composition API functions and components
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore' // Import tasks store
import { useUserStore } from '@/stores/userStore' // Import user store
import { storeToRefs } from 'pinia' // Import storeToRefs function
import { required, minLength, helpers } from '@vuelidate/validators' // Import validators

import NavBar from '@/components/NavBar.vue' // Import NavBar component
import TaskCard from '@/components/TaskCard.vue' // Import TaskCard component
import EditModal from '@/components/EditModal.vue' // Import EditModal component
import SortTasks from '@/components/SortTasks.vue' // Import SortTasks component
import TasksEmptyState from '@/components/TasksEmptyState.vue' // Import TasksEmptyState component

// Initialize tasks and user stores
const tasksStore = useTasksStore()
const userStore = useUserStore()

// Destructure values from the tasks store
const { taskSortered } = storeToRefs(tasksStore)

// Initialize variables and states
const isModalVisible = ref(false)
const editedTask = ref(null)
const loadingTask = ref(false)

// Fetch tasks and user data on component mount
onMounted(async () => {
  loadingTask.value = true
  await userStore.fetchUserHideCompletedSetting()
  await userStore.fetchUserSortingPreference()
  await tasksStore.fetchAllTasks()
  loadingTask.value = false
})

// Function to open create task modal
const openCreateModal = () => {
  editedTask.value = null
  isModalVisible.value = true
}

// Function to show/hide modal
const showModal = (value) => {
  isModalVisible.value = value
}

// Function to open edit task modal
const openEditModal = (task) => {
  editedTask.value = task
  isModalVisible.value = true
}

// Function to save edited task
const saveEditedTask = async (title) => {
  if (editedTask.value) {
    // If task is being edited, update it
    const taskToUpdate = {
      ...editedTask.value,
      title
    }
    await tasksStore.updateExistingTask(taskToUpdate)
  } else {
    // If new task is being added, create it
    const task = {
      title
    }
    await tasksStore.createNewTask(task)
    tasksStore.fetchAllTasks()
  }
  isModalVisible.value = false
}
</script>

<template>
  <!-- Render NavBar component -->
  <NavBar />

  <!-- Main container for tasks -->
  <div class="pt-16 max-w-160 mx-auto w-full h-screen">
    <!-- Button to add task -->
    <button
      @click="openCreateModal()"
      class="fixed right-6 top-24 hidden sm:block md:block lg:block h-12 ml-4 bg-primary hover:bg-hover dark:bg-gray-700 dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl py-2 px-4 hover:shadow-md"
    >
      Add task
    </button>

    <!-- Loading message -->
    <p v-if="loadingTask" class="pt-56 px-6 max-w-120 mx-auto w-full h-screen">Loading tasks…</p>

    <!-- Task list -->
    <template v-else>
      <!-- If there are tasks -->
      <div class="px-6 h-taskWrap1" v-if="taskSortered.length !== 0">
        <!-- Title and sorting options -->
        <div class="mb-4 sm:pt-16 pt-8">
          <div class="w-full">
            <div class="text-3xl font-bold mb-4 text-center w-full">
                {{ userStore.displayName ? `${userStore.displayName}'s` : 'Your' }} tasks ({{
                  taskSortered.length
                }})
              </div>
          </div>
          <!-- Sorting component -->
          <SortTasks />
        </div>

        <!-- Task cards -->
        <div class="h-taskWrap overflow-y-auto">
          <div class="h-min space-y-4">
            <!-- Render TaskCard component for each task -->
            <TaskCard
              v-for="task in taskSortered"
              :key="task.id"
              :task="task"
              @edit="openEditModal(task)"
            />
          </div>
        </div>
      </div>

      <!-- If there are no tasks -->
      <div class="pt-16 max-w-160 mx-auto w-full h-screen" v-else-if="taskSortered.length === 0">
        <div class="pb-6 px-6 overflow-y-auto h-auto flex items-center">
          <!-- Render TasksEmptyState component -->
          <TasksEmptyState />
        </div>
      </div>
    </template>

    <!-- Button to add task for mobile view -->
    <div class="block sm:hidden lg:hidden dark:bg-gray-800 p-6 w-full fixed bottom-0">
      <button
        @click="openCreateModal()"
        class="w-full h-14 bg-primary dark:bg-gray-700 hover:bg-hover dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
      >
        Add task
      </button>
    </div>
  </div>

  <!-- Render EditModal component -->
  <EditModal
    v-if="isModalVisible"
    type="text"
    :dialogTitle="editedTask ? 'Edit task' : 'Add task'"
    labelTitle="Title *"
    errorMsg="Enter a task title"
    helperText="Minimum 3 characters"
    :show="isModalVisible"
    @show="showModal(value)"
    :value="editedTask ? editedTask.title : ''"
    :validateRule="{
      required: helpers.withMessage('Enter a title', required),
      minLength: helpers.withMessage('The title must be minimum 4 characters', minLength(4))
    }"
    :save="saveEditedTask"
  />
</template>
