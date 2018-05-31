import http from './../helper/axois'

export default {
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
  fetchMembersList  ({ commit }) {
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
  fetchFamiliesList  ({ commit }) {
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
  fetchClassesList  ({ commit }) {
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
  modifySubjectIdData: ({ commit }, data) => http.patch('/subject/update/' + data.id, data.data),
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
}
