<script setup>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'

// Define props received by the component
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  showErrorInModal: {
    type: Boolean
  },
  dialogTitle: {
    type: String,
    required: true
  },
  labelTitle: {
    type: String,
    required: true
  },
  helperText: {
    type: String
  },
  errorMsg: {
    type: String,
    required: true
  },
  show: {
    required: true
  },
  value: {
    required: true
  },
  save: {
    type: Function,
    required: true
  },
  validateRule: {
    type: Object,
    required: true
  }
})

// Define emits to emit events to parent components
const emit = defineEmits(['save', 'show'])

// Define reactive form data
const form = reactive({
  title: props.value
})

// Compute validation rules
const rules = computed(() => {
  return {
    title: props.validateRule
  }
})

// Function to close the modal
const closeModal = () => {
  emit('show', false)
}

// Use vuelidate to handle form validation
const v$ = useVuelidate(rules, form)

// Function to handle form submission
async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (result) {
    // If validation passes, save the form data
    props.save(form.title)
  }
}
</script>

<template>
  <!-- Modal container -->
  <div
    :class="['fixed z-10 inset-0 overflow-y-auto']"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex justify-center min-h-screen">
      <!-- Modal background -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="closeModal"
      ></div>
      <!-- Modal content -->
      <form
        @submit.prevent="handleSubmit"
        class="transform fixed w-full bottom-0 sm:block sm:max-w-lg sm:bottom-1/3 overflow-hidden rounded-t-lg sm:rounded-b-lg"
        novalidate
      >
        <!-- Modal header -->
        <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium" id="modal-title">
            {{ dialogTitle }}
          </h3>
          <div class="mt-2">
            <div class="space-y-1">
              <!-- Form input -->
              <label class="font-medium text-lg text-left w-full block" for="title">{{
                labelTitle
              }}</label>
              <input
                :type="type"
                v-model="form.title"
                id="title"
                :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.title.$error ? 'outline-red-300' : 'outline-gray-300'} ${v$.title.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
              />
              <!-- Error message if input is invalid -->
              <template v-if="v$.title.$error">
                <span class="block text-red-500 text-sm text-left">{{
                  v$.title.$errors[0].$message
                }}</span>
              </template>
              <!-- Helper text -->
              <template v-else>
                <span v-if="helperText" class="block text-sm text-left">{{ helperText }}</span>
              </template>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse">
          <div class="flex justify-end sm:justify-start w-full">
            <!-- Save button -->
            <button
              type="submit"
              class="w-full h-12 mb-2 bg-primary hover:bg-hover dark:bg-primary dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-md p-3 hover:shadow-md"
            >
              Save
            </button>
            <!-- Hidden space for small screens -->
            <div class="sm:hidden h-4"></div>
          </div>
          <!-- Space for medium and larger screens -->
          <div class="hidden sm:flex sm:justify-center sm:items-center">
            <div class="w-4"></div>
          </div>
          <div class="flex justify-end sm:justify-start w-full">
            <!-- Cancel button -->
            <button
              type="button"
              @click="closeModal"
              class="w-full h-12 mb-2 bg-secondary hover:bg-hover dark:bg-gray-700 dark:hover:bg-gray-600 text- hover:text-white rounded-lg text-center font-semibold text-md p-3 hover:shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
