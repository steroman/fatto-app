<script setup>
import { supabase } from '@/lib/supabaseClient'
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'

const account = ref(null)
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

onMounted(async () => {
  account.value = await supabase.auth.getSession()
})

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>

<template>
  <main>
    <h1>Tasks view</h1>
    <template v-if="account && account.data.session.user.email">
      <p>{{ account.data.session.user.email }}</p>
      <span> {{ tasks.length }}</span>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </main>
</template>

<style scoped></style>
