<script setup>
import { supabase } from '@/lib/supabaseClient'
import { ref, onMounted } from 'vue'

const account = ref(null)

onMounted(async () => {
  account.value = await supabase.auth.getSession()
})
</script>

<template>
  <main>
    <h1>Tasks view</h1>
    <template v-if="account && account.data.session.user.email">
      <p>{{ account.data.session.user.email }}</p>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </main>
</template>

<style scoped></style>
