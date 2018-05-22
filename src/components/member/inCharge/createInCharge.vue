<template>
<div class="container ins-container col-10" >
  <h4 class="text-nowrap text-center w-100 mb-5 form-control-sm heading">
    <strong>Responsable de Élève</strong>
  </h4>
    <form @submit.prevent="register">
      <div class="form-row">
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Nom</label>
          <input v-model="inCharge.lastname" type="text" class="form-control is-valid"  placeholder="Nom">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Prénom</label>
          <input v-model="inCharge.firstname" type="text" class="form-control is-valid"  placeholder="Prénom">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Date de naissance</label>
          <input v-model="inCharge.dob" type="date" class="form-control is-valid" placeholder="Date de naissance">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Genre</label>
          <select v-model="inCharge.gender" class="form-control is-valid"
          placeholder="Genre" required>
              <option disabled value='null'>Sélectionnez le genre......</option>
              <option>Homme</option>
              <option>Femme</option>
            </select>
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Mobile</label>
          <input v-model="inCharge.mobileNo" class="form-control is-valid"  placeholder="Mobile">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Téléphone</label>
          <input v-model="inCharge.telephone" class="form-control is-valid"  placeholder="Télèphone">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-5 mb-4">
          <label class="col-form-label font-weight-bold">Email</label>
          <input v-model="inCharge.email" type="email" class="form-control is-valid" placeholder="l'Adresse Email">
          </div>
          <div class="col-md-7 mb-4">
          <label class="col-form-label font-weight-bold">Adresse</label>
          <input v-model="inCharge.address" type="text" class="form-control is-valid"  placeholder="Adresse">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Statut</label>
          <select v-model="inCharge.status" class="form-control is-valid"  placeholder="Statut" required>
              <option disabled value='null'>Sélectionnez le status......</option>
              <option value="true">Actif</option>
              <option value="false">Inactif</option>
            </select>
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Code postal</label>
          <input v-model="inCharge.cp" type="text" pattern="[0-9]{5}" class="form-control is-valid" placeholder="Code Postale">
        </div>
        <div class="col-md-4 mb-4">
          <label class="col-form-label font-weight-bold">Ville</label>
          <input v-model="inCharge.town" type="text" class="form-control is-valid"   placeholder="Ville">
        </div>
      </div>
      <div align="right">
        <button class="btn btn-secondary  mb-5">Enregistrer</button>
      </div>
    </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      inCharge: {
        firstname: '',
        lastname: '',
        email: '',
        mobileNo: '',
        telephone: '',
        status: null,
        gender: null,
        address: '',
        town: '',
        cp: '',
        roleInCharge: true,
        role: 'Responsable de Élève',
        page: 'manageInCharge'
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('saveMember', this.inCharge)
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'listOfMembers'})
            this.$swal('Responsable de Élève ' + this.inCharge.lastname + ' est créé avec succès')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.inCharge.lastname)
        })
    }
  }
}
</script>

<style scoped>
</style>
