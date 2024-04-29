<template>
      <NavBar />
    <div class="pt-24 max-w-160 mx-auto w-full h-screen">
      <button
        @click="openCreateModal()"
        class="fixed right-6 top-24 hidden sm:block md:block lg:block h-12 ml-4 bg-primary hover:bg-hover dark:bg-gray-700 dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl py-2 px-4 hover:shadow-md"
      >
        Add task
      </button>
      <p v-if="loadingTask" class="pt-56 px-6 max-w-120 mx-auto w-full h-screen">
        Loading tasks…
      </p>

      <template v-else>
        <div class="px-6 h-taskWrap1" v-if="taskSortered.length !== 0">
          <div class="mb-4 pt-8">
            <div class="w-full">
              <div class="text-3xl font-bold mb-4 text-center w-full">
                {{ userStore.displayName ? `${userStore.displayName}'s` : 'Your' }} tasks ({{
                  taskSortered.length
                }})
              </div>
            </div>
            <SortTasks />
          </div>

          <div class="h-taskWrap overflow-y-auto">
            <div class="h-min space-y-4">
              <TaskCard
                v-for="task in taskSortered"
                :key="task.id"
                :task="task"
                @edit="openEditModal(task)"
              />
            </div>
          </div>
        </div>
        <div
          class="pt-32 sm:pt-24 max-w-160 mx-auto w-full h-screen"
          v-else-if="taskSortered.length === 0"
        >
          <div class="pb-6 px-6 overflow-y-auto h-auto flex items-center">
            <TasksEmptyState />
          </div>
        </div>
      </template>
      <div
        class="block sm:hidden lg:hidden dark:bg-gray-800 p-6 w-full fixed bottom-0"
      >
        <button
          @click="openCreateModal()"
          class="w-full h-14 bg-primary dark:bg-gray-700 hover:bg-hover dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
        >
          Add task
        </button>
      </div>
    </div>

    <EditModal
      v-if="isModalVisible"
      type="text"
      :dialogTitle="editedTask ? 'Edit task' : 'Create a task'"
      labelTitle="Task Title *"
      errorMsg="Enter a task title"
      :show="isModalVisible"
      @show="showModal(value)"
      :value="editedTask ? editedTask.title : ''"
      :validateRule="{
        required: helpers.withMessage('Task title cannot be empty', required),
        minLength: helpers.withMessage(
          'Task title cannot be shorter than 3 characters',
          minLength(3)
        )
      }"
      :save="saveEditedTask"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { required, minLength, helpers } from '@vuelidate/validators'

import NavBar from '@/components/NavBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import EditModal from '@/components/EditModal.vue'
import SortTasks from '@/components/SortTasks.vue'
import TasksEmptyState from '@/components/TasksEmptyState.vue'

const tasksStore = useTasksStore()
const userStore = useUserStore()

const { taskSortered } = storeToRefs(tasksStore)
const { user } = storeToRefs(userStore)

const isModalVisible = ref(false)
const editedTask = ref(null)
const loadingTask = ref(false)

onMounted(async () => {
  loadingTask.value = true
  await userStore.fetchUserHideCompletedSetting()
  await userStore.fetchUserSortingPreference()
  await tasksStore.fetchAllTasks()
  loadingTask.value = false
})

const openCreateModal = () => {
  editedTask.value = null
  isModalVisible.value = true
}

const showModal = (value) => {
  isModalVisible.value = value
}

const openEditModal = (task) => {
  editedTask.value = task
  isModalVisible.value = true
}

const saveEditedTask = async (title) => {
  if (editedTask.value) {
    const taskToUpdate = {
      ...editedTask.value,
      title
    }
    await tasksStore.updateExistingTask(taskToUpdate)
  } else {
    const task = {
      title
    }

    await tasksStore.createNewTask(task)
    tasksStore.fetchAllTasks()
  }
  isModalVisible.value = false
}

const cancelEditModal = () => {
  isModalVisible.value = false
}
</script>
