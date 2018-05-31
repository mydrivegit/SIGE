<template>
<div>
  <div class="container ins-container col-10" >
    <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm heading">
      <strong>Classe</strong>
    </h4>
    <form @submit.prevent="register">
      <div class="form-row">
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Code</label>
          <input v-model="classId.code" type="text" class="form-control is-valid" placeholder="Code">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Année</label>
          <input v-model="classId.year" type="text" class="form-control is-valid" placeholder="Année">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Trimestre</label>
          <select v-model="classId.semester" class="form-control is-valid"  placeholder="Statut" required>
            <option disabled value='null'>Sélectionnez le Semestre......</option>
            <option value=1>1er</option>
            <option value=2>2ème</option>
            <option value=3>3ème</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Libellé</label>
          <input v-model="classId.label" type="text" class="form-control is-valid" placeholder="Libellé">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Niveau</label>
          <input v-model="classId.level" type="text" class="form-control is-valid" placeholder="Niveau">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Statut</label>
          <select v-model="classId.status" class="form-control is-valid"  placeholder="Statut" required>
            <option disabled value='null'>Sélectionnez le status......</option>
            <option value=true>Overte</option>
            <option value=false>Terminée</option>
          </select>
        </div>
      </div>
      <div align="right">
        <button class="btn btn-secondary  mb-5">Enregistrer</button>
      </div>
    </form>
  </div>
  <div class="container ins-container table-responsive col-10">
      <div class="text-nowarp">
        <table class="table table-hover">
          <thead class="thead-light ">
            <tr>
              <th scope="col">Nom Prénom | Elève <i class="fa fa-sort-asc"></i><br> </th>
              <th scope="col">Date de Naissance <i class="fa fa-sort"></i></th>
              <th scope="col">Genre <i class="fa fa-sort-desc"></i></th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody v-for="member in classId.studentIds" :key="member._id">
            <tr class="content">
              <th>{{member.lastname}} {{member.firstname}}</th>
              <td>{{moment(member.dob).format('L')}}</td>
              <td>{{member.gender}}</td>
              <td><i @click="removeStudentId(member._id)" class="fa fa-trash cursor"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div align="right" class="mb-4">
        <div @click="addStudent()" role="button" class="btn btn-secondary"><i class="fa fa-plus"></i>  Ajoutez un élève</div>
      </div>
  </div>
  <div class="container ins-container table-responsive col-10">
      <div class="text-nowarp">
        <table class="table table-hover">
          <thead class="thead-light ">
            <tr>
              <th scope="col">Matière
                <i class="fa fa-sort-asc"></i>
                <br> </th>
              <th scope="col">Date d'ajout
                <i class="fa fa-sort"></i>
              </th>
              <th scope="col">Statut
                <i class="fa fa-sort-desc"></i>
              </th>
              <th scope="col">Suppprimer
              </th>
            </tr>
          </thead>
          <tbody v-for="subject in classId.subjectIds" :key="subject._id">
            <tr class="content">
              <th>{{subject.name}}</th>
              <td>{{moment(subject.addedDate).format('L')}}</td>
              <td><div v-if="subject.status">Active</div>
              <div v-else>Inactive</div></td>
              <td><i @click="removeSubjectId(subject._id)" class="fa fa-trash cursor"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div align="right">
        <div @click="addSubject()" role="button" class="btn btn-secondary">
          <i class="fa fa-plus"></i> Ajoutez une matière</div>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    register () {
      this.$store.dispatch('modifyClassIdData', {data: this.classId, id: this.$route.params.classId})
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'listOfClass'})
            this.$swal('classe ' + this.classId.label + ' Niveau ' + this.classId.level + ' ' + 'est modifée')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.classId.lastname)
        })
    },
    addStudent () {
      this.$router.push({ name: 'addStudentInClass', params: { classId: this.$route.params.classId } })
    },
    addSubject () {
      this.$router.push({ name: 'addSubjectInClass', params: { classId: this.$route.params.classId } })
    },
    removeStudentId (arg) {
      this.classId.studentIds.splice(arg, 1)
      this.$store.dispatch('removeDetailFromClass', {id: this.$route.params.classId, data: {studentIds: arg}})
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'manageClass'})
            this.$swal('le membre est retiré de la classe')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la suppression du membre de la liste')
        })
    },
    removeSubjectId (arg) {
      this.classId.subjectIds.splice(arg, 1)
      this.$store.dispatch('removeDetailFromClass', {id: this.$route.params.classId, data: {subjectIds: arg}})
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'manageClass'})
            this.$swal('Matiére est retiré de la classe')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la suppression du membre de la liste')
        })
    }
  },
  computed: {
    ...mapActions([('fetchMembersList')]),
    ...mapGetters(['classId'])
  },
  created () {
    this.$store.dispatch('fetchClassId', this.$route.params.classId)
    return this.fetchMembersList
  }
}
</script>

<style>

</style>
