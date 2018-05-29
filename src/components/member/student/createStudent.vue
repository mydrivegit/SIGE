<template>
<div>
  <div class="container ins-container col-10" >
      <h4 class="text-nowrap text-center w-100 mb-5 form-control-sm heading">
        <strong class="text-uppercase markdown-body">Élève</strong>
      </h4>
        <form @submit.prevent="register">
          <div class="form-row align-self-center">
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Statut</label>
              <select v-model="student.status"  class="form-control is-valid" placeholder="Statut" required>
                <option disabled value='null'>Sélectionnez le status......</option>
                <option value='true'>Actif</option>
                <option value='false'>Inactif</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Classe</label>
              <select v-model="student.class"  class="form-control is-valid"
              placeholder="Classe" required>
              <option disabled value='null'>Sélectionnez la classe......</option>
              <option>Coran Niv1</option>
              <option>Coran Niv2</option>
            </select>
            </div>
            <div class="col-md-4" >
              <label class="col-form-label font-weight-bold">Responsable</label>
                <select v-model="student.inCharge"  class="form-control is-valid"
                placeholder="Statut">
                  <option disabled value='null'>Sélectionnez le responsable......</option>
                  <option v-for="item in members" :key="item._id" v-show="item.roleInCharge">{{item.lastname}} {{item.firstname}} </option>
                </select>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Nom</label>
              <input v-model="student.lastname" type="text" class="form-control is-valid" placeholder="Nom" required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Prénom</label>
              <input v-model="student.firstname" type="text" class="form-control is-valid" placeholder="Prénom"  required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Date de naissance</label>
              <input v-model="student.dob" type="date" class="form-control is-valid" placeholder="Date de naissance"  required>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Genre</label>
              <select v-model="student.gender" class="form-control is-valid"
              placeholder="Genre" required>
                  <option disabled value='null'>Sélectionnez le genre......</option>
                  <option>Homme</option>
                  <option>Femme</option>
                </select>
            </div>
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Mobile</label>
              <input v-model="student.mobileNo" type="tel" class="form-control is-valid" placeholder="Mobile"  required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Téléphone</label>
              <input v-model="student.telephone" type="tel" class="form-control is-valid" placeholder="Télèphone"  required>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-12">
              <label class="col-form-label font-weight-bold">Email</label>
              <input v-model="student.email" type="email" class="form-control is-valid" placeholder="l'Adresse Email" required>
            </div>
          </div>
          <div class="form-row mb-4">
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Adresse</label>
              <input v-model="student.address" type="text" class="form-control is-valid" placeholder="Adress" required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Code postal</label>
              <input v-model="student.cp" type="number" pattern="[0-9]{5}" class="form-control is-valid" placeholder="code postale" required>
            </div>
            <div class="col-md-4">
              <label class="col-form-label font-weight-bold">Ville</label>
              <input v-model="student.town" type="text" class="form-control is-valid" placeholder="Ville" required>
            </div>
          </div>
          <button class="btn btn-secondary  mb-5">Enregistrer</button>
        </form>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      student: {
        firstname: '',
        lastname: '',
        email: '',
        mobileNo: '',
        telephone: '',
        status: null,
        class: null,
        inCharge: null,
        dob: '',
        gender: null,
        address: '',
        town: '',
        cp: '',
        roleStudent: true,
        role: 'Élève',
        page: 'manageStudent'
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('saveMember', this.student)
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'listOfMembers'})
            this.$swal('Élève ' + this.student.lastname + ' est créé avec succès')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.student.lastname)
        })
    }
  },
  computed: {
    ...mapGetters(['members']),
    ...mapActions([('fetchMembersList')])
  },
  created () {
    return this.fetchMembersList
  }
}
</script>

<style scoped>
</style>
