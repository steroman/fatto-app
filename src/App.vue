<template>
  <ToastMessage />
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useToastStore } from '@/stores/toastStore'
import { storeToRefs } from 'pinia'
import ToastMessage from '@/components/ToastMessage.vue'

const userStore = useUserStore()
const toastStore = useToastStore()

const { isDarkMode } = storeToRefs(userStore)
const { show } = storeToRefs(toastStore)

onMounted(() => {
  show.value = false
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<style scoped>
</style>
