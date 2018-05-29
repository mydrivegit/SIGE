<template>
<div class="modal-dialog pl-5">
  <div class="col-12 main-section">
    <div class="modal-content">
      <div class="col-lg-12 col-sm-12 col-12 ">
        <strong class="modal-header">Créér Une Matière</strong>
      </div>
      <div class="col-lg-12 col-sm-12 col-12 form-input">
        <form @submit.prevent="register">
          <div class="form-row">
            <div class="col-md-5 offset-md-1">
              <label for="" class="col-form-label font-weight-bold">Code</label>
              <input v-model="subject.code" type="text" class="form-control is-valid" placeholder="Code">
            </div>
            <div class="col-md-5">
              <label for="" class="col-form-label font-weight-bold">Nom</label>
              <input v-model="subject.name" type="text" class="form-control is-valid" placeholder="Nom">
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-5 offset-md-1">
              <label for="" class="col-form-label font-weight-bold">Date d'ajout</label>
              <input v-model="subject.addedDate" type="date" class="form-control is-valid" placeholder="Date d'ajout">
            </div>
            <div class="col-md-5 mb-3">
              <label for="" class="col-form-label font-weight-bold">Statut</label>
              <select v-model="subject.status" class="form-control is-valid" placeholder="Statut" required>
                <option disabled value='null'>Sélectionnez le status......</option>
                <option value='true'>Actif</option>
                <option value='false'>Inactif</option>
              </select>
            </div>
          </div>
          <div align="right">
            <button class="btn btn-secondary  mb-2">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      subject: {
        code: '',
        name: '',
        addedDate: '',
        status: null
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('saveSubject', this.subject)
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'listOfSubject'})
            this.$swal(this.subject.name + ' est créé')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.subject.name)
        })
    }
  }
}
</script>

<style>

</style>
