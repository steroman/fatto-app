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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
