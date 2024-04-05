<template>
    <div>
      <button class="btn" @click="openModal()">Open Sorting Options</button>
      <dialog ref="sortModal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Sorting Options</h3>
          <div class="form-control" v-for="option in sortingOptions" :key="option.value">
            <label class="label cursor-pointer">
              <span class="label-text">{{ option.label }}</span>
              <input type="radio" name="sortingOption" class="radio" :value="option.value" v-model="selectedSort" @change="applySorting" />
            </label>
          </div>
          <div class="modal-action">
            <button class="btn" @click="closeModal()">Close</button>
          </div>
        </div>
      </dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useTasksStore } from '@/stores/tasksStore'
  
  const tasksStore = useTasksStore();
  const selectedSort = ref(tasksStore.sortingPreference); // Initialize selectedSort as a ref
  const sortingOptions = tasksStore.sortingOptions;
  const sortModal = ref(null);
  
  // Watch for changes to the shared sorting preference in the store
  watch(() => tasksStore.sharedSortingPreference, (newSortOption) => {
    selectedSort.value = newSortOption; // Update selectedSort in SortingModal
  });
  
  const openModal = () => {
    sortModal.value.showModal();
  };
  
  const closeModal = () => {
    sortModal.value.close();
  };
  
  const applySorting = () => {
    localStorage.setItem('sortingPreference', selectedSort.value);
    tasksStore.sortingPreference = selectedSort.value;
    tasksStore.fetchAllTasks();
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  