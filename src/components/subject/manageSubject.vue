<template>
    <div class="modal-dialog">
      <div class="col-12 main-section">
        <div class="modal-content">
          <div class="col-lg-12 col-sm-12 col-12 subject-name">
            <h6 class="mb-4 modal-header">Détails Matière</h6>
          </div>
          <div class="col-lg-12 col-sm-12 col-12 form-input">
            <form @submit.prevent="modify">
              <div class="form-row">
                <div class="col-md-5 offset-md-1">
                  <label for="" class="col-form-label font-weight-bold">Code</label>
                  <input v-model="subjectId.code" type="text" class="form-control is-valid" title="Code" data-toggle="tooltip" data-placement="bottom" placeholder="Code">
                </div>
                <div class="col-md-5">
                  <label for="" class="col-form-label font-weight-bold">Nom</label>
                  <input v-model="subjectId.name" type="text" class="form-control is-valid" title="Nom" data-toggle="tooltip" data-placement="bottom" placeholder="Nom">
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-5 offset-md-1">
                  <label for="" class="col-form-label font-weight-bold">Date</label>
                  <input v-model="subjectId.addedDate" type="text" class="form-control is-valid" title="Date" data-toggle="tooltip" data-placement="bottom" placeholder="JJ/MM/YYYY">
                </div>
                <div class="col-md-5 mb-4">
                  <label for="" class="col-form-label font-weight-bold">Statut</label>
                  <select v-model="subjectId.status" class="form-control is-valid" placeholder="Statut" required>
                    <option disabled value='null'>Sélectionnez le status......</option>
                    <option value='true'>Actif</option>
                    <option value='false'>Inactif</option>
                  </select>
                </div>
              </div>
              <div align="right">
                <button class="btn btn-secondary col-5 mb-2">
                  <i class="fa fa-pencil"></i>
                  Modifier</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    modify () {
      this.$store.dispatch('modifySubjectIdData', {data: this.subjectId, id: this.$route.params.subjectId})
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'listOfSubject'})
            this.$swal(this.subjectId.name + ' est modifée')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.family.title)
        })
    }
  },
  computed: {
    ...mapGetters(['subjectId'])
  },
  created () {
    this.$store.dispatch('fetchSubjectId', this.$route.params.subjectId)
  }
}
</script>

<style>

</style>
