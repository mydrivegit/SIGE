<template>
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
          <label class="col-form-label font-weight-bold">Semestre</label>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    register () {
      this.$store.dispatch('modifyClassIdData', {data: this.classId, id: this.$route.params.classId})
        .then(res => {
          console.log(res)
          if (res.status === 201) {
            this.$router.push({name: 'listOfClass'})
            this.$swal('classe ' + this.classId.label + ' Niveau ' + this.classId.level + ' ' + 'est modifée')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.classId.lastname)
        })
    }
  },
  computed: {
    ...mapActions([('fetchMembersList')]),
    ...mapGetters(['classes', 'classId'])
  },
  created () {
    this.$store.dispatch('fetchClassId', this.$route.params.classId)
    return this.fetchMembersList
  }
}
</script>

<style>

</style>
