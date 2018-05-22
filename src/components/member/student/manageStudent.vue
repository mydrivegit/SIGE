<template>
<div>
  <div class="container ins-container col-10" >
      <h4 class="text-nowrap text-center w-100 mb-5 form-control-sm heading">
        <strong class="text-uppercase markdown-body">Fiche élève</strong>
      </h4>
        <form @submit.prevent="modify">
          <div class="form-row align-self-center">
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Statut</label>
              <select v-model="student.status"  class="form-control is-valid"
              data-toggle="tooltip" data-placement="bottom" title="Statut" required>
              <option disabled value='null'>Sélectionnez le status......</option>
              <option value='true'>Actif</option>
              <option value='false'>Inactif</option>
            </select>
            </div>
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Classe</label>
              <select v-model="student.class"  class="form-control is-valid"
              data-toggle="tooltip" data-placement="bottom" title="Classe" required>
              <option disabled value='null'>Sélectionnez la classe......</option>
              <option>Coran Niv1</option>
              <option>Coran Niv2</option>
            </select>
            </div>
            <div class="col-md-4" >
              <label class="col-form-label  font-weight-bold">Responsable</label>
            <select v-model="student.inCharge"  class="form-control is-valid"
              data-toggle="tooltip" data-placement="bottom" title="Statut">
              <option disabled value='null'>Sélectionnez le responsable......</option>
              <option v-for="item in members" :key="item._id" v-show="item.roleInCharge">{{item.lastname}} {{item.firstname}} </option>
            </select>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Nom</label>
              <input v-model="student.lastname" type="text" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="Nom" required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Prénom</label>
              <input v-model="student.firstname" type="text" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="Prénom"  required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Date de naissance</label>
              <input v-model="student.dob" placeholder="JJ/MM/YYYY" class="form-control date is-valid" data-toggle="tooltip" data-placement="bottom" title="Date de naissance">
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Genre</label>
              <select v-model="student.gender" class="form-control is-valid"
              data-toggle="tooltip" data-placement="bottom" title="Genre" required>
                  <option disabled value='null'>Sélectionnez le genre......</option>
                  <option>Homme</option>
                  <option>Femme</option>
                </select>
            </div>
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Mobile</label>
              <input v-model="student.mobileNo" type="tel" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="Mobile"  required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Téléphone</label>
              <input v-model="student.telephone" type="tel" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="Télèphone"  required>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-12">
              <label class="col-form-label  font-weight-bold">Email</label>
              <input v-model="student.email" type="email" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="Adress Email" required>
            </div>
          </div>
          <div class="form-row mb-4">
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Adresse</label>
              <input v-model="student.address" type="text" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="Adress" required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Code postal</label>
              <input v-model="student.cp" type="number" pattern="[0-9]{5}" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="code postale" required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label  font-weight-bold">Ville</label>
              <input v-model="student.town" type="text" class="form-control is-valid" data-toggle="tooltip" data-placement="bottom" title="Ville" required>
            </div>
          </div>
          <button class="btn btn-secondary  mb-5">Submit</button>
        </form>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    modify () {
      this.$store.dispatch('modifyMemberIdData', {data: this.student, id: this.$route.params.memberId})
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'listOfMembers'})
            this.$swal('Élève ' + this.student.lastname + ' est modifée avec succès')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.student.lastname)
        })
    }
  },
  computed: {
    ...mapGetters({
      student: 'memberId',
      members: 'members'
    }),
    ...mapActions([('fetchMembersList')])
  },
  created () {
    this.$store.dispatch('fetchMemberId', this.$route.params.memberId)
    return this.fetchMembersList
  }
}
</script>

<style scoped>
</style>
