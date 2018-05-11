import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/auth/login'
import register from '@/components/user/register'
import listOfUser from '@/components/user/listOfUser'
import listOfNonActiveUser from '@/components/user/listOfNonActiveUser'
import manageUser from '@/components/user/manageUser'
import managePassword from '@/components/user/managePassword'
import sidebar from '@/components/sidebar/sidebar'
import navbar from '@/components/sidebar/navbar'

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
      path: '/navbar',
      name: 'navbar',
      component: navbar
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: register, navbar, sidebar
      }
    },
    {
      path: '/listOfUser',
      name: 'listOfUser',
      components: {
        default: listOfUser, navbar, sidebar
      }
    },
    {
      path: '/listOfNonActiveUser',
      name: 'listOfNonActiveUser',
      components: {
        default: listOfNonActiveUser, navbar, sidebar
      }
    },
    {
      path: '/manageUser/:userId',
      name: 'manageUser',
      components: {
        default: manageUser, navbar, sidebar
      }
    },
    {
      path: '/managePassword/:userId',
      name: 'managePassword',
      components: {
        default: managePassword, navbar, sidebar
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
