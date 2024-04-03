<script setup>
// import { useUserStore } from '@/stores/userStore'
// import { useRouter } from 'vue-router'
// import NavBar from '@/components/NavBar.vue'

// const userStore = useUserStore()

// const router = useRouter()

// const logOut = async () => {
//   await userStore.signOut()
//   router.push('/login')
// }
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterView />
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/tasks">Tasks</RouterLink>
        <button @click="logOut()">Logout</button>
      </nav> -->
    </div>
  </header>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
