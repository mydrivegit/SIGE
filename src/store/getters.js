export default {
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
  subjectId: (state) => state.subjectId,
  // Attendence Getters
  attMemberId: (state) => state.attMemberId,
  attendenceId: (state) => state.attendenceId
}
