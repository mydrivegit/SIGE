import http from '@/helper/axois'
import moment from 'moment'

export default {
  state: {
    // Families
    families: [],
    familyId: [],
    StudentInFamilies: []
  },

  actions: {
    //  for Family Actions
    saveFamily: ({ commit }, authdata) => http.post('/family/', authdata),
    fetchFamiliesList ({ commit }) {
      http.get('/family/')
        .then(res => {
          commit('storeFamilies', res.data.docs)
        })
        .catch(err => {
          return console.log(err)
        })
    },
    fetchFamilyId ({ commit }, IdParams) {
      http.get('/family/' + IdParams)
        .then(res => {
          commit('storeFamilyId', res.data.docs)
        })
        .catch(err => {
          console.log(err)
        })
    },
    modifyFamilyIdData: ({ commit }, data) => http.patch('/family/update/' + data.id, data.data),
    listOfStudentInFamily ({ commit }, data) {
      http.put('/member/family/', data)
        .then(res => {
          commit('storeStudentInFamily', res.data.docs)
        })
        .catch(err => {
          return console.log(err)
        })
    }
  },

  mutations: {
    //  Families Mutation
    storeFamilies (state, families) {
      state.families = families
    },
    storeFamilyId (state, familyId) {
      familyId.registeredOn = moment(familyId.registeredOn).format('DD/MM/YYYY')
      familyId.validatedOn = moment(familyId.validatedOn).format('DD/MM/YYYY')
      state.familyId = familyId
    },
    storeStudentInFamily (state, StudentInFamilies) {
      state.StudentInFamilies = StudentInFamilies
    }
  },

  getters: {
    // Families Getters
    families: (state) => state.families,
    familyId: (state) => state.familyId,
    //  Get the students of concern family
    StudentInFamilies: (state) => state.StudentInFamilies
  }

}
