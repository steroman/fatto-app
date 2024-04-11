<template>
    <div>
      <!-- SortComponent -->
      <div class="hidden sm:block">
        <select v-model="selectedSort" @change="applySorting">
          <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </div>
      
      <!-- SortingModal -->
      <div class="sm:hidden">
        <button class="btn" @click="openModal">Open Sorting Options</button>
        <dialog ref="sortModal" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Sorting Options</h3>
            <div class="form-control" v-for="option in SORT_OPTIONS" :key="option.value">
              <label class="label cursor-pointer">
                <span class="label-text">{{ option.label }}</span>
                <input type="radio" name="sortingOption" class="radio" :value="option.value" v-model="selectedSort" @change="applySorting" />
              </label>
            </div>
            <div class="modal-action">
              <button class="btn" @click="closeModal">Close</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useTasksStore, SORT_OPTIONS } from '@/stores/tasksStore'
  import { useUserStore } from '@/stores/userStore'
  
  const tasksStore = useTasksStore();
  const userStore = useUserStore();

  onMounted(() => {
    const userId = userStore.user.id;
    tasksStore.fetchAllTasks(userId);
  }
  );

  const selectedSort = ref(tasksStore.sortingPreference);
  const sortModal = ref(null);
  
  const openModal = () => {
    sortModal.value.showModal();
  };
  
  const closeModal = () => {
    sortModal.value.close();
  };
  
const applySorting = () => {
  userStore.updateUserSortingPreference(selectedSort.value);
};
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  