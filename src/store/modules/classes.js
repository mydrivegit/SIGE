import http from '@/helper/axois'

export default {
  state: {
    // Classes State
    classes: [],
    memberIdclassesId: [],
    classId: [],
    memberInClass: []
  },

  actions: {
    //  Class Actions
    saveClass: ({ commit }, authdata) => http.post('/classes/', authdata),
    fetchClassesList ({ commit }) {
      http.get('/classes/')
        .then(res => {
          commit('storeClasses', res.data.docs)
        })
        .catch(err => {
          return console.log(err)
        })
    },
    fetchClassId ({ commit }, IdParams) {
      http.get('/classes/' + IdParams)
        .then(res => {
          commit('storeClassId', res.data.docs)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchClassDetailsOfMember ({ commit }, IdParams) {
      http.get('/classes/ClassDetailsOfMember/' + IdParams)
        .then(res => {
          commit('storeMemberInClass', res.data.docs)
        })
        .catch(err => {
          return console.log(err)
        })
    },
    modifyClassIdData: ({ commit }, data) => http.patch('/classes/update/' + data.id, data.data),
    addDetailInClass: ({ commit }, data) => http.patch('/classes/updateDetail/' + data.id, data.data),
    removeDetailFromClass: ({ commit }, data) => http.patch('/classes/pullDetail/' + data.id, data.data)
  },

  mutations: {
    //  Class Mutation
    storeClasses (state, classes) {
      state.classes = classes
    },
    storeMemberIdClassId (state, memberIdclassesId) {
      state.memberIdclassesId = memberIdclassesId
    },
    storeClassId (state, classId) {
      state.classId = classId
    },
    storeMemberInClass (state, memberInClass) {
      state.memberInClass = memberInClass
    }
  },

  getters: {
    // Class Getters
    classes: (state) => state.classes,
    memberIdclassesId: (state) => state.memberIdclassesId,
    classId: (state) => state.classId,
    memberInClass: (state) => state.memberInClass
  }

}
