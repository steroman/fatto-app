<!-- Requires DaisyUI-->

<template>
    <div>
      <!-- Button to open the modal -->
      <button class="btn" @click="openModal()">Open Sorting Options</button>
  
      <!-- Modal -->
      <dialog ref="sortModal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Sorting Options</h3>
          <!-- Rendering radio buttons for each sorting option -->
          <div class="form-control" v-for="option in sortingOptions" :key="option.value">
            <label class="label cursor-pointer">
              <span class="label-text">{{ option.label }}</span> 
              <input type="radio" name="sortingOption" class="radio" :value="option.value" v-model="selectedSort" @change="applySorting" />
            </label>
          </div>
          <!-- Close button -->
          <div class="modal-action">
            <button class="btn" @click="closeModal()">Close</button>
          </div>
        </div>
      </dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useTasksStore } from '@/stores/tasksStore'
  
  const tasksStore = useTasksStore();
  const selectedSort = ref(tasksStore.sortingPreference);
  const sortingOptions = tasksStore.sortingOptions;
  const sortModal = ref(null); // Create a ref for the modal
  
  // Function to open the modal
  const openModal = () => {
    sortModal.value.showModal(); // Accessing the modal reference
  };
  
  // Function to close the modal
  const closeModal = () => {
    sortModal.value.close(); // Accessing the modal reference
  };
  
  // Function to apply sorting when a radio button is selected
  const applySorting = () => {
    localStorage.setItem('sortingPreference', selectedSort.value);
    tasksStore.sortingPreference = selectedSort.value;
    tasksStore.fetchAllTasks();
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  