<template>
    <div>
      <select v-model="selectedSort">
        <option v-for="option in sortingOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useTasksStore } from '@/stores/tasksStore'
  
  const tasksStore = useTasksStore();
  const selectedSort = ref(tasksStore.sortingPreference); // Initialize selectedSort as a ref
  const sortingOptions = tasksStore.sortingOptions;
  
  // Watch for changes to the sortingPreference in the store
  watch(() => tasksStore.sortingPreference, (newSortOption) => {
    selectedSort.value = newSortOption; // Update selectedSort in SortComponent
  });
  
  // Watch for changes to the selected sorting option
  watch(selectedSort, (newSortOption) => {
    tasksStore.sortingPreference = newSortOption; // Update the sorting preference in the store
    tasksStore.fetchAllTasks(); // Fetch tasks with the new sorting preference
  });
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  