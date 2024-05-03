<script setup>
// Importing necessary functions and variables from Vue
import { ref, watch } from 'vue'

// Defining props, in this case, a single prop called 'isChecked'
const props = defineProps({
  isChecked: {
    type: Boolean,
    required: true
  }
})

// Creating a reactive reference for a random switch ID
const switchId = ref(Math.ceil(Math.random() * 10000))
// Creating a reactive reference for the checked state based on the prop
const checked = ref(props.isChecked)

// Watching for changes in the prop 'isChecked'
watch(
  () => props.isChecked,
  (newValue) => {
    checked.value = newValue // Updating the checked state based on the prop change
  }
)

// Defining custom events to be emitted by the component, in this case, a 'change' event
const emit = defineEmits(['change'])

// Function to handle the change event of the switch
const onChange = () => {
  emit('change', !props.isChecked) // Emitting the 'change' event with the opposite value of the prop 'isChecked'
}
</script>

<template>
  <!-- Switch component wrapped in a label for accessibility -->
  <label :for="[switchId.toString()]" class="flex items-center cursor-pointer">
    <div class="relative">
      <!-- Input representing the checkbox with a unique ID and two-way binding to the 'checked' state -->
      <input
        :id="[switchId.toString()]"
        type="checkbox"
        class="sr-only"
        v-model="checked"
        @change="onChange"
      />
      <!-- Track of the switch -->
      <div class="block bg-gray-600 dark:bg-primaryDark w-14 h-8 rounded-full"></div>
      <!-- Handle (dot) of the switch -->
      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
    </div>
  </label>
</template>

<style scoped>
/* Styling when the input is checked */
input:checked ~ .dot {
  transform: translateX(100%); /* Moving the handle to the 'on' position */
}

input:checked ~ .block {
  background-color: var(--primary); /* Changing the track color when checked */
}
</style>
