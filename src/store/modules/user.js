import http from '@/helper/axois'

export default {
  state: {
    users: null,
    userDetails: [],
    userId: []
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
          return console.log(err)
        })
    },
    fetchUserId ({ commit }, IdParams) {
      http.get('/users/' + IdParams)
        .then(res => {
          commit('storeUserId', res.data.result)
        })
        .catch(err => {
          return console.log(err)
        })
    },
    fetchUser: ({ commit }) => http.get('/users/profile'),
    modifyData: ({ commit }, userdata) => http.patch('/users', userdata),
    modifyUserIdData: ({ commit }, data) => http.patch('/users/update/' + data.id, data.data)
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
    //  User Getter
    users: (state) => state.users,
    userDetails: (state) => state.userDetails,
    userId: (state) => state.userId,
    role: (state) => state.role
  }

}
