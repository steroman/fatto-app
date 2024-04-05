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
  const selectedSort = ref(tasksStore.sortingPreference);
  const sortingOptions = tasksStore.sortingOptions;
  
  const applySorting = () => {
    localStorage.setItem('sortingPreference', selectedSort.value);
    tasksStore.sortingPreference = selectedSort.value;
  };
  
  watch(selectedSort, () => {
    applySorting();
    tasksStore.fetchAllTasks();
  });
  </script>
  
  <style scoped>
  </style>
  