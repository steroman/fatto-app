<template>
    <div
      :class="['fixed z-10 inset-0 overflow-y-auto']"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex justify-center min-h-screen">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeModal"
        ></div>
        <form
          @submit.prevent="handleSubmit"
          class="transform fixed w-full bottom-0 sm:block sm:max-w-lg sm:bottom-1/3 overflow-hidden rounded-t-lg sm:rounded-b-lg"
          novalidate
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium" id="modal-title">
              {{ dialogTitle }}
            </h3>
            <div class="mt-2">
              <div class="space-y-1">
                <label class="font-medium text-lg text-left w-full block" for="title">{{
                  labelTitle
                }}</label>
                <input
                  :type="type"
                  v-model="form.title"
                  id="title"
                  :class="`rounded-md bg-white dark:text-gray-900 w-full h-12 text-sm px-6 py-4 outline-none ${v$.title.$error ? 'outline-red-300' : 'outline-gray-300'} ${v$.title.$error ? 'focus:outline-red-600' : 'focus:outline-primary'}`"
                />
                <span v-if="v$.title.$error" class="block text-red-500 text-sm text-left">{{
                  v$.title.$errors[0].$message
                }}</span>
                <span
                  v-if="showErrorInModal && errorMsg"
                  class="block text-red-500 text-sm text-left"
                  >{{ errorMsg }}</span
                >
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse">
  <div class="flex justify-end sm:justify-start w-full">
    <button
      type="submit"
      class="w-full h-12 mb-2 bg-primary hover:bg-hover dark:bg-primary dark:hover:bg-gray-600 text-white hover:text-white rounded-lg text-center font-semibold text-md p-3 hover:shadow-md"
    >
      Save
    </button>
    <div class="sm:hidden h-4"></div> <!-- Spacer for mobile -->
  </div>
  <div class="hidden sm:flex sm:justify-center sm:items-center">
    <div class="w-4"></div> <!-- Spacer for desktop -->
  </div>
  <div class="flex justify-end sm:justify-start w-full">
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
1</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUpdated } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { fromJSON } from 'postcss'

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

const emit = defineEmits(['save', 'show'])

const form = reactive({
  title: props.value
})

const rules = computed(() => {
  return {
    title: props.validateRule
  }
})

const closeModal = () => {
  emit('show', false)
}

const v$ = useVuelidate(rules, form)

async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (result) {
    props.save(form.title)
  }
}
</script>
