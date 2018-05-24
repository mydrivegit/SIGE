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
import createStudent from '@/components/member/student/createStudent'
import listOfMembers from '@/components/member/listOfMembers'
import listOfNonActiveMembers from '@/components/member/listOfNonActiveMembers'
import manageStudent from '@/components/member/student/manageStudent'
import createProf from '@/components/member/professor/createProf'
import manageProf from '@/components/member/professor/manageProf'
import createInCharge from '@/components/member/inCharge/createInCharge'
import manageInCharge from '@/components/member/inCharge/manageInCharge'
import listOfFamilies from '@/components/family/listOfFamilies'
import createFamily from '@/components/family/createFamily'
import manageFamily from '@/components/family/manageFamily'
import addStudentInFamily from '@/components/family/addStudentInFamily'
import createClass from '@/components/class/createClass'
import manageClass from '@/components/class/manageClass'
import listOfClass from '@/components/class/listOfClass'
import addStudentInClass from '@/components/class/addStudentInClass'

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
    },
    {
      path: '/createStudent',
      name: 'createStudent',
      components: {
        default: createStudent, navbar, sidebar
      }
    },
    {
      path: '/listOfMembers',
      name: 'listOfMembers',
      components: {
        default: listOfMembers, navbar, sidebar
      }
    },
    {
      path: '/listOfNonActiveMembers',
      name: 'listOfNonActiveMembers',
      components: {
        default: listOfNonActiveMembers, navbar, sidebar
      }
    },
    {
      path: '/manageStudent/:memberId',
      name: 'manageStudent',
      components: {
        default: manageStudent, navbar, sidebar
      }
    },
    {
      path: '/createProf',
      name: 'createProf',
      components: {
        default: createProf, navbar, sidebar
      }
    },
    {
      path: '/manageProf/:memberId',
      name: 'manageProf',
      components: {
        default: manageProf, navbar, sidebar
      }
    },
    {
      path: '/createInCharge',
      name: 'createInCharge',
      components: {
        default: createInCharge, navbar, sidebar
      }
    },
    {
      path: '/manageInCharge/:memberId',
      name: 'manageInCharge',
      components: {
        default: manageInCharge, navbar, sidebar
      }
    },
    {
      path: '/listOfFamilies',
      name: 'listOfFamilies',
      components: {
        default: listOfFamilies, navbar, sidebar
      }
    },
    {
      path: '/createFamily',
      name: 'createFamily',
      components: {
        default: createFamily, navbar, sidebar
      }
    },
    {
      path: '/manageFamily/:memberId',
      name: 'manageFamily',
      components: {
        default: manageFamily, navbar, sidebar
      }
    },
    {
      path: '/addStudentInFamily/:memberId',
      name: 'addStudentInFamily',
      components: {
        default: addStudentInFamily, navbar, sidebar
      }
    },
    {
      path: '/createClass',
      name: 'createClass',
      components: {
        default: createClass, navbar, sidebar
      }
    },
    {
      path: '/listOfClass',
      name: 'listOfClass',
      components: {
        default: listOfClass, navbar, sidebar
      }
    },
    {
      path: '/manageClass/:classId',
      name: 'manageClass',
      components: {
        default: manageClass, navbar, sidebar
      }
    },
    {
      path: '/addStudentInClass/:classId',
      name: 'addStudentInClass',
      components: {
        default: addStudentInClass, navbar, sidebar
      }
    },
    {
      path: '*',
      redirect: { name: 'listOfMembers' }
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
