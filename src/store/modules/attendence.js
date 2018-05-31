import http from '@/helper/axois'
import moment from 'moment'

export default {
  state: {
    // Attendence State
    attMemberId: [],
    attendenceId: []
  },

  actions: {
    // Attendence Actions
    saveAttendence: ({ commit }, authdata) => http.post('/attendence/', authdata),
    fetchAttMemberId ({ commit }, IdParams) {
      http.get('/attendence/member/' + IdParams)
        .then(res => {
          commit('storeAttMemberId', res.data.docs)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAttendenceId ({ commit }, IdParams) {
      http.get('/attendence/' + IdParams)
        .then(res => {
          commit('storeAttendenceId', res.data.docs)
        })
        .catch(err => {
          console.log(err)
        })
    },
    modifyAttendenceIdData: ({ commit }, data) => http.patch('/attendence/update/' + data.id, data.data),
    deleteAttendenceIdData: ({ commit }, IdParams) => http.delete('/attendence/' + IdParams)
  },

  mutations: {
    // Attendence Mutation
    storeAttMemberId (state, attMemberId) {
      state.attMemberId = attMemberId
    },
    storeAttendenceId (state, attendenceId) {
      attendenceId.dateOfAttendence = moment(attendenceId.dateOfAttendence).format('DD/MM/YYYY')
      state.attendenceId = attendenceId
    }
  },

  getters: {
    // Attendence Getters
    attMemberId: (state) => state.attMemberId,
    attendenceId: (state) => state.attendenceId
  }
}
