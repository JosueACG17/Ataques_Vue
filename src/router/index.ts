import { createRouter, createWebHistory } from 'vue-router'
import { isAuth } from '@/composables/isAuth'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true,}
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: {requiresAuth: false,}
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {requiresAuth: false,}
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: {requiresAuth: false,}
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = !!isAuth().value
  if (to.meta.requiresAuth && !auth) {
    next({ name: 'Login' })
  } else if ((to.name === 'Login' || to.name === 'Register') && auth) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
