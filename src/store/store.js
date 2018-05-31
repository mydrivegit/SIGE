import Vue from 'vue'
import Vuex from 'vuex'
// Importing Modules
import user from '@/store/modules/user'
import member from '@/store/modules/member'
import family from '@/store/modules/family'
import subject from '@/store/modules/subject'
import classes from '@/store/modules/classes'
import attendence from '@/store/modules/attendence'
import email from '@/store/modules/email'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    member,
    family,
    subject,
    classes,
    attendence,
    email
  }
})
