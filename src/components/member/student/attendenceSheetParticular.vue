<template>
<div>
    <div class="container ins-container col-10">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm heading">
        <strong>Saisie des Absences <br> pour {{memberId.lastname}} {{memberId.firstname}}</strong>
      </h4>
      <form @submit.prevent="saveAttendence" class="form-group">
        <div class="row">
          <div class="col-md-3 col-lg-3 col-12 mb-3">
            <select v-model="attendence.member" class="btn col-12">
                <option disabled value='null'>Member......</option>
                <option>Élève</option>
                <!-- <option>Enseignant</option> -->
            </select>
          </div>
          <div class="col-md-3 col-lg-2 mb-3">
            <select v-model="attendence.classId" class="btn col-12">
                <option disabled value='null'>Classe......</option>
                <option v-for="option in memberInClass" :value="option._id" :key="option._id">{{option.label}}</option>
            </select>
          </div>
          <div class="col-md-3 col-lg-3 mb-3">
            <select v-model="attendence.subjectId" class="btn col-12">
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
            <input v-model="attendence.dateOfAttendence"
            class="form-control"
            type="date" data-toggle="tooltip"
            data-placement="bottom"
            title="Date de début">
          </div>
        </div>
        <div class="row">
          <div class="col-md-8  col-xl-6 col-sm-12 col-12 mb-4 form-group">
            <textarea v-model="attendence.comment" class="form-control" cols="6" rows="6" placeholder="Commentaire..." data-toggle="tooltip" data-placement="bottom"  title="Commentaire"></textarea>
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
          <div class="col-md-6 col-lg-2 col-xl-2 offset-sm-0 col-sm-6 col-12 mb-5 form-group">
            <button class="btn btn-secondary form-control">Absent(e) </button>
          </div>
          <!-- <div class="col-md-6 col-lg-4 col-xl-4 col-sm-6 col-12 mb-5 form-group">
            <button class="btn form-control">Notifier via SMS et Mail </button>
          </div> -->
        </div>
      </form>
    </div>
    <div class="container ins-container table-responsive col-10">
      <div>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr class="text-left">
              <th style="width: 20vh">Date <i class="fa fa-sort-asc"></i></th>
              <th style="width: 20vh">Classe </th>
              <th style="width: 20vh">Matière</th>
              <th style="width: 40vh">Commentaire</th>
            </tr>
          </thead>
          <tbody v-for="details in attMemberId" :key="details._id">
            <tr class="content">
              <th>{{moment(details.dateOfAttendence).format('L')}}</th>
              <td>{{details.classId.label}}</td>
              <td>{{details.subjectId.name}}</td>
              <td>{{details.comment}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div align="right">
        <button class="btn btn-secondary"><i class="fa fa-print"></i>  Imprimé</button>
      </div> -->
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      attendence: {
        memberId: this.$route.params.memberId,
        classId: null,
        subjectId: null,
        member: null,
        comment: '',
        dateOfAttendence: '',
        status: false
      }
    }
  },
  methods: {
    saveAttendence () {
      this.$store.dispatch('saveAttendence', this.attendence)
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'manageStudent'})
            this.$swal('l\'absence est ajouté')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ')
        })
    }
  },
  computed: {
    ...mapGetters(['memberInClass', 'subjects', 'attMemberId', 'memberId'])
  },
  created () {
    this.$store.dispatch('fetchClassDetailsOfMember', this.$route.params.memberId)
    this.$store.dispatch('fetchAttMemberId', this.$route.params.memberId)
    this.$store.dispatch('fetchMemberId', this.$route.params.memberId)
    this.$store.dispatch('fetchSubjectList')
  }
}
</script>

<style scoped>
</style>
