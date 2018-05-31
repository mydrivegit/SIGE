import http from '@/helper/axois'
import moment from 'moment'

export default {
  state: {
    // Subjects State
    subjects: [],
    subjectId: [],
    subjectInMember: []
  },

  actions: {
    // subject Actions
    saveSubject: ({ commit }, authdata) => http.post('/subject/', authdata),
    fetchSubjectList ({ commit }) {
      http.get('/subject/')
        .then(res => {
          commit('storeSubjects', res.data.docs)
        })
        .catch(err => {
          return console.log(err)
        })
    },
    fetchSubjectId ({ commit }, IdParams) {
      http.get('/subject/' + IdParams)
        .then(res => {
          commit('storeSubjectId', res.data.docs)
        })
        .catch(err => {
          console.log(err)
        })
    },
    modifySubjectIdData: ({ commit }, data) => http.patch('/subject/update/' + data.id, data.data)
  },

  mutations: {
    //  Subject Mutation
    storeSubjects (state, subjects) {
      state.subjects = subjects
    },
    storeSubjectId (state, subjectId) {
      subjectId.addedDate = moment(subjectId.addedDate).format('DD/MM/YYYY')
      state.subjectId = subjectId
    }
  },

  getters: {
    // Subject Getters
    subjects: (state) => state.subjects,
    subjectId: (state) => state.subjectId
  }

}
