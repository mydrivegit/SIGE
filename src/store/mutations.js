import moment from 'moment'

export default {
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
  },
  // Attendence Mutation
  storeAttMemberId (state, attMemberId) {
    attMemberId.dateOfAttendence = moment(attMemberId.dateOfAttendence).format('DD/MM/YYYY')
    state.attMemberId = attMemberId
  },
  storeAttendenceId (state, attendenceId) {
    if (attendenceId) {
      attendenceId.dateOfAttendence = moment(attendenceId.dateOfAttendence).format('DD/MM/YYYY')
    }
    state.attendenceId = attendenceId
  }
}
