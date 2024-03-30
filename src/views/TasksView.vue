<script setup>
import { supabase } from '@/lib/supabaseClient'
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import CreateTask from '@/components/CreateTask.vue'

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
      <!-- <p>{{ account.data.session.user.email }}</p> -->
      <CreateTask :account="account" />
      <span> {{ tasks.length }}</span>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.title }}
        </li>
      </ul>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </main>
</template>

<style scoped></style>
