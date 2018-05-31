<template>
<div>
    <div class="container ins-container col-10">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm heading">
        <strong>Saisie des Absences <br> pour {{memberId.lastname}} {{memberId.firstname}}</strong>
      </h4>
      <form @submit.prevent="modifyAttendence" class="form-group">
        <div class="row">
          <div class="col-md-3 col-lg-3 col-12 mb-3">
            <select v-model="attendenceId.member" class="btn col-12">
                <option disabled value='null'>Member......</option>
                <option>Élève</option>
                <!-- <option>Enseignant</option> -->
            </select>
          </div>
          <div class="col-md-3 col-lg-2 mb-3">
            <select v-model="attendenceId.classId" class="btn col-12">
                <option disabled value='null'>Classe......</option>
                <option v-for="option in memberInClass" :value="option._id" :key="option._id">{{option.label}}</option>
            </select>
          </div>
          <div class="col-md-3 col-lg-3 mb-3">
            <select v-model="attendenceId.subjectId" class="btn col-12">
                <option disabled value='null'>Matière......</option>
                <option v-for="option in subjects" :value="option._id" :key="option._id">{{option.name}}</option>
            </select>
          </div>
        </div>
          <!-- <div class="col-md-4 col-lg-3 col-xl-3 col-sm-6 col-12 mb-4">
            <div id="calender"></div>
          </div> -->
        <div class="row">
          <div class="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12 mb-5 form-group">
            <input v-model="attendenceId.dateOfAttendence"
            class="form-control"
            type="text" data-toggle="tooltip"
            data-placement="bottom"
            title="Date de début"
            placeholder="jj/mm/aaaa">
          </div>
        </div>
        <div class="row">
          <div class="col-md-8  col-xl-6 col-sm-12 col-12 mb-4 form-group">
            <textarea v-model="attendenceId.comment" class="form-control" cols="6" rows="6" placeholder="Commentaire..." data-toggle="tooltip" data-placement="bottom"  title="Commentaire"></textarea>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-md-6 col-lg-2 col-xl-2 col-sm-6 col-12 mb-5 form-group">
            <input class="form-control" id="time" type="time" data-toggle="tooltip" data-placement="bottom"  title="L'heure de début">
          </div>
          <div class="col-md-6 col-lg-2 col-xl-2 col-sm-6 col-12 mb-5 form-group">
            <input class="form-control" id="date" type="date" data-toggle="tooltip" data-placement="bottom"  title="Date de fin">
          </div>
          <div class="col-md-6 col-lg-2 col-xl-2 col-sm-6 col-12 mb-5 form-group">
            <input class="form-control" id="time" type="time" data-toggle="tooltip" data-placement="bottom"  title="L'heure de fin">
          </div> -->
        </div>
        <div class="row">
          <div class="col-md-2">
            <button class="btn btn-secondary form-control">Modifér</button>
          </div>
          <!-- <div class="col-md-6 col-lg-4 col-xl-4 col-sm-6 col-12 mb-5 form-group">
            <button class="btn form-control">Notifier via SMS et Mail </button>
          </div> -->
        </div>
      </form>
        <div class="row col-md-2">
          <button @click="deleteAttendence" class="btn btn-secondary form-control">Delete</button>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    modifyAttendence () {
      this.$store.dispatch('modifyAttendenceIdData', { data: this.attendenceId, id: this.$route.params.attendenceId })
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'manageStudent'})
            this.$swal('l\'absent est modifié')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ')
        })
    },
    deleteAttendence () {
      this.$store.dispatch('deleteAttendenceIdData', this.$route.params.attendenceId)
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'manageStudent'})
            this.$swal('Supprimé avec succès')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ')
        })
    }
  },
  computed: {
    ...mapGetters(['memberInClass', 'subjects', 'memberId', 'attendenceId'])
  },
  created () {
    this.$store.dispatch('fetchClassDetailsOfMember', this.$route.params.memberId)
    this.$store.dispatch('fetchMemberId', this.$route.params.memberId)
    this.$store.dispatch('fetchAttendenceId', this.$route.params.attendenceId)
    this.$store.dispatch('fetchSubjectList')
  }
}
</script>

<style scoped>
</style>
