import http from '@/helper/axois'
import moment from 'moment'

export default {
  state: {
    // Members State
    members: [],
    memberId: []
  },

  actions: {
    //  For User Actions
    saveMember: ({ commit }, authdata) => http.post('/member/', authdata),
    fetchMembersList ({ commit }) {
      http.get('/member/')
        .then(res => {
          commit('storeMembers', res.data.docs)
        })
        .catch(err => {
          return console.log(err)
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
    //  Member Getter
    members: (state) => state.members,
    memberId: (state) => state.memberId
  }

}
