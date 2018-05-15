import Vue from 'vue'
import Vuex from 'vuex'
import http from './../helper/axois'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    userDetails: [],
    userId: [],
    role: [{ text: 'Sélectionnez le rôle......', value: null
    }, { text: 'Administrateur', value: 'Admin'
    }, { text: 'Utilisateur', value: 'User'
    }],
    // Members State
    members: null,
    memberId: []
  },
  actions: {
    login: ({ commit }, authdata) => http.post('/auth/login', authdata),
    register: ({ commit }, authdata) => http.post('/auth/signup', authdata),
    fetchUsersList ({ commit }) {
      http.get('/users')
        .then(res => {
          commit('storeUsers', res.data.content)
        })
        .catch(err => {
          return err.status(404).send(err.message)
        })
    },
    fetchUserId ({ commit }, IdParams) {
      http.get('/users/' + IdParams)
        .then(res => {
          commit('storeUserId', res.data.result)
        })
        .catch(err => {
          return err.status(404).send(err.message)
        })
    },
    fetchUser: ({ commit }) => http.get('/users/profile'),
    modifyData: ({ commit }, userdata) => http.patch('/users', userdata),
    modifyUserIdData: ({ commit }, data) => http.patch('/users/update/' + data.id, data.data),
    //  For User Actions
    saveMember: ({ commit }, authdata) => http.post('/member/', authdata),
    fetchMembersList ({ commit }) {
      http.get('/member/')
        .then(res => {
          commit('storeMembers', res.data.docs)
        })
        .catch(err => {
          return err.status(404).send(err.message)
        })
    },
    fetchMemberId ({ commit }, IdParams) {
      http.get('/member/' + IdParams)
        .then(res => {
          commit('storeMemberId', res.data.docs)
        })
        .catch(err => {
          console.log(err)
        })
    },
    modifyMemberIdData: ({ commit }, data) => http.patch('/member/update/' + data.id, data.data)
  },
  mutations: {
    storeUsers (state, users) {
      state.users = users
    },
    storeUser (state, userDetails) {
      state.userDetails = userDetails
    },
    storeUserId (state, userId) {
      state.userId = userId
    },
    // members Mutation
    storeMembers (state, members) {
      state.members = members
    },
    storeMemberId (state, memberId) {
      memberId.dob = moment(memberId.dob).format('DD/MM/YYYY')
      state.memberId = memberId
    }
  },
  getters: {
    //  User Getter
    users: (state) => state.users,
    userDetails: (state) => state.userDetails,
    userId: (state) => state.userId,
    role: (state) => state.role,
    //  Member Getter
    members: (state) => state.members,
    memberId: (state) => state.memberId
  }
})
