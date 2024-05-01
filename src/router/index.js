import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
// import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('@/views/AboutView.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/UserLoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/UserSignupView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPasswordView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TasksView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/ResetPasswordView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('@/views/PageNotFound.vue'),
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Wait for seeUser() to complete
  await userStore.seeUser()

  // console.log('Current route:', to.path)
  // console.log('Authenticated user:', userStore.user)

  if (userStore.user?.recovery_sent_at && to.path !== '/reset-password') {
    next('/reset-password')
  } else {
    if ((to.path === '/login' || to.path === '/') && userStore.user) {
      // console.log('Redirecting to /tasks')
      next('/tasks') // Redirect to /tasks if the user is already authenticated
    } else if (to.path !== '/login' && to.meta.requiresAuth && !userStore.user) {
      // console.log('Redirecting to /login')
      next('/login')
    } else {
      // console.log('Allowing navigation')
      next()
    }
  }
})

export default router
