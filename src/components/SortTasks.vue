<template>
  <div class="sm:block relative w-full hidden">
    <div
      @click="showMenu(!show)"
      class="block appearance-none w-full bg-white dark:bg-gray-700 border border-gray-400 hover:border-gray-500 px-4 py-3 text-left text-lg pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      {{ label }}
    </div>

    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"
    >
      <i class="material-icons">keyboard_arrow_down</i>
    </div>
    <div class="bg-white w-full absolute rounded-md z-40 shadow-md dark:bg-gray-700" v-if="show">
      <div
        @click="applySorting(option.value)"
        :selected="option.value === selectedSort"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :class="[
          'text-left py-3 px-4 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-600 dark:hover:text-white',
          selectedSort === option.value ? 'bg-primary dark:bg-gray-900 text-white' : ''
        ]"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { SORT_OPTIONS, useTasksStore } from '@/stores/tasksStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref, watch } from 'vue'

const userStore = useUserStore()
const tasksStore = useTasksStore()
const selectedSort = ref(userStore.sortingPreference)
const label = ref('')
const show = ref(false)

const showMenu = (value) => {
  show.value = value
}

const options = SORT_OPTIONS
const applySorting = (value) => {
  selectedSort.value = value
  show.value = false
  userStore.updateUserSortingPreference(selectedSort.value)
}

watch(
  () => selectedSort.value,
  (newValue, oldValue) => {
    SORT_OPTIONS.map((option) => {
      if (option.value === newValue) {
        label.value = option.label
      }
    })
  }
)
onMounted(() => {
  SORT_OPTIONS.map((option) => {
    if (option.value === selectedSort.value) {
      label.value = option.label
    }
  })
  const userId = userStore.user.id
  tasksStore.fetchAllTasks(userId)
  selectedSort.value = userStore.sortingPreference
})
</script>

<style scoped></style>
