<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    isChecked: {
        type: Boolean,
        required: true
    },
})

const switchId = ref(Math.ceil(Math.random() * 10000));
const checked = ref(props.isChecked)

watch(() => props.isChecked, (newValue) => {
    checked.value = newValue
});

const emit = defineEmits(['change'])

const onChange = () => {
    emit('change', !props.isChecked);
}
</script>

<template>
    <label :for="[switchId.toString()]" class="flex items-center cursor-pointer">
        <div class="relative">
            <input :id="[switchId.toString()]" type="checkbox" class="sr-only" v-model="checked" @change="onChange"/>
            <div class="block bg-gray-600 dark:bg-primaryDark w-14 h-8 rounded-full"></div>
            <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
    </label>
</template>
  
<style scoped>
input:checked~.dot {
    transform: translateX(100%);
}

input:checked~.block {
    background-color: var(--primary);
}
</style>
  