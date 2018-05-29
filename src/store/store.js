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
    // Members State
    members: null,
    memberId: [],
    // Families
    families: null,
    familyId: [],
    StudentInFamilies: null,
    // Members State
    classes: [],
    memberIdclassesId: [],
    classId: [],
    memberInClass: [],
    // Subjects State
    subjects: [],
    subjectId: []
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
    modifyUserIdData: ({ commit }, data) => http.patch('/users/update/' + data.id, data.data),
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
    modifyMemberIdData: ({ commit }, data) => http.patch('/member/update/' + data.id, data.data),
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
    },
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
          console.log(res)
          commit('storeMemberInClass', res.data.docs)
        })
        .catch(err => {
          return console.log(err)
        })
    },
    modifyClassIdData: ({ commit }, data) => http.patch('/classes/update/' + data.id, data.data),
    addDetailInClass: ({ commit }, data) => http.patch('/classes/updateDetail/' + data.id, data.data),
    removeDetailFromClass: ({ commit }, data) => http.patch('/classes/pullDetail/' + data.id, data.data),
    // email Actions
    sendEmail: ({ commit }, authdata) => http.post('/email/', authdata),
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
    },
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
    },
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
    },
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
    //  User Getter
    users: (state) => state.users,
    userDetails: (state) => state.userDetails,
    userId: (state) => state.userId,
    role: (state) => state.role,
    //  Member Getter
    members: (state) => state.members,
    memberId: (state) => state.memberId,
    // Families Getters
    families: (state) => state.families,
    familyId: (state) => state.familyId,
    //  Get the students of concern family
    StudentInFamilies: (state) => state.StudentInFamilies,
    // Class Getters
    classes: (state) => state.classes,
    memberIdclassesId: (state) => state.memberIdclassesId,
    classId: (state) => state.classId,
    memberInClass: (state) => state.memberInClass,
    // Families Getters
    subjects: (state) => state.subjects,
    subjectId: (state) => state.subjectId
  }
})
