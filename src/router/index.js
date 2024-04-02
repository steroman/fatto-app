import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/stores/userStore'

// let localUser

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TasksView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/NoAuthView.vue')
    }
  ]
})

async function getUser(next) {
  // localUser = await supabase.auth.getSession()
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.seeUser()
    console.log('User ---->> ', userStore.user)
  }

  // Lamaría a un método mío de la store para ver si hay un usuario logueado
  if (userStore.user === null) {
    next('/unauthorized')
  } else {
    next()
  }
}

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.seeUser()
    // console.log('User ---->> ', userStore.user)
  }

  if (to.path === '/login' && userStore.user) {
    next('/tasks')
  } else if (to.path !== '/login' && to.meta.requiresAuth && !userStore.user) {
    next('/login')
  } else {
    next()
  }
})

export default router
