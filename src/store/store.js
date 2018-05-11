import Vue from 'vue'
import Vuex from 'vuex'
import http from './../helper/axois'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    userDetails: [],
    userId: [],
    role: [{ text: 'Sélectionnez le rôle......', value: null
    }, { text: 'Administrateur', value: 'Admin'
    }, { text: 'Utilisateur', value: 'User'
    }]
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
          console.log(err)
        })
    },
    fetchUserId ({ commit }, IdParams) {
      http.get('/users/' + IdParams)
        .then(res => {
          commit('storeUserId', res.data.result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchUser: ({ commit }) => http.get('/users/profile'),
    modifyData: ({ commit }, userdata) => http.patch('/users', userdata),
    modifyUserIdData: ({ commit }, data) => http.patch('/users/update/' + data.id, data.data),
    deleteUser: ({ commit }) => http.delete('/users'),
    deleteUserById: ({ commit }, paramsId) => http.delete('/users/delete/' + paramsId)
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
    }
  },
  getters: {
    users: (state) => state.users,
    userDetails: (state) => state.userDetails,
    userId: (state) => state.userId,
    role: (state) => state.role
  }
})
