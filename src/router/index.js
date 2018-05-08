import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/auth/login'
import register from '@/components/auth/register'
import sidebar from '@/components/sidebar/sidebar'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: { requiresAuth: false }
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: sidebar
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: register, sidebar
      }
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth === false)) {
    next() // make sure to always call next()!
  } else {
    // this route requires auth, check if logged in
    if (localStorage.getItem('token')) {
      next()
    } else {
      // if not, redirect to login page.
      next({ name: 'login' })
    }
  }
})

export default router
