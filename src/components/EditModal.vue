<script setup>
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['save', 'cancel'])
const modalRef = ref(null)
const inputValue = ref('')

const _save = () => {
  const newData = inputValue.value;
  console.log("Save button clicked. New data:", newData); // Add this line
  emit('save', newData);
};


const _cancel = () => {
  emit('cancel')
}

const props = defineProps({
  isVisible: Boolean,
  modalTitle: String,
  inputPlaceholder: String,
  saveButtonLabel: String,
  cancelButtonLabel: String,
  defaultValue: String,
  type: String
})

inputValue.value = props.defaultValue

watch(() => props.isVisible, () => {
  if (props.isVisible) {
    modalRef.value.showModal()  // Show the modal if isVisible is true
  } else {
    modalRef.value.close()  // Close the modal if isVisible is false
  }
})

onMounted(() => {
  if (props.isVisible) {
    modalRef.value.showModal()  // Show the modal if isVisible is true when component is mounted
  }
})
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <!-- Modal content -->
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ props.modalTitle }}</h3>
      <input v-model="inputValue" :type="props.type" class="input my-4" :placeholder="props.inputPlaceholder">
      <div class="modal-action">
        <button @click="_save" class="btn mr-2">{{ props.saveButtonLabel }}</button>
        <button @click="_cancel" class="btn btn-ghost">{{ props.cancelButtonLabel }}</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
/* Add scoped styles here */
.modal {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.modal-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
