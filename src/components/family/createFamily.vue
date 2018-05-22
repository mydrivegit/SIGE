<template>
<div>
  <div class="container ins-container col-10" >
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm heading">
        <strong>Inscription</strong>
      </h4>
        <form @submit.prevent="register">
          <div class="form-row">
            <div class="col-md-4 mb-4" >
              <label class="col-form-label font-weight-bold">Liebellé</label>
              <input v-model="family.title" type="text" class="form-control is-valid" placeholder="Libellé">
            </div>
            <div class="col-md-4 mb-4">
              <label class="col-form-label font-weight-bold">Responsable</label>
              <input v-model="family.inCharge" class="form-control is-valid" placeholder="Responsable">
            </div>
            <div class="col-md-4 mb-4">
              <label class="col-form-label font-weight-bold">Date de Inscription</label>
              <input v-model="family.registeredOn" type="date" class="form-control is-valid" placeholder="Date de Inscription">
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4 mb-4">
              <label class="col-form-label font-weight-bold">Année</label>
              <input v-model="family.year" type="text" class="form-control is-valid" placeholder="Année">
            </div>
            <div class="col-md-4 mb-4">
              <label class="col-form-label font-weight-bold">Type</label>
              <select v-model="family.type"  class="form-control is-valid" placeholder="Statut" required>
                <option disabled value='null'>Sélectionnez le type......</option>
                <option>Famille</option>
                <option>Seul</option>
              </select>
            </div>
            <div class="col-md-4 mb-4">
              <label class="col-form-label font-weight-bold">Statut</label>
              <select  v-model="family.status"  class="form-control is-valid" placeholder="Statut" required>
                  <option disabled value='null'>Sélectionnez le status......</option>
                  <option value='Validée'>Validée</option>
                  <option value='Attente Paiement'>Attente Paiement</option>
                  <option value='Attente Document'>Attente Document</option>
                  <option value='Terminée'>Terminée</option>
                </select>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-3  mb-4">
              <label class="col-form-label font-weight-bold">Date de validation</label>
              <input v-model="family.validatedOn"  type="date" class="form-control is-valid" placeholder="Date de validation">
              </div>
              <div class="col-md-3  mb-4">
              <label class="col-form-label font-weight-bold">Code</label>
              <input v-model="family.code" type="text" class="form-control is-valid">
            </div>
            <div class="col-md-6  mb-4">
              <label class="col-form-label font-weight-bold">Commentaire</label>
              <textarea v-model="family.comments" class="form-control is-valid" name="" rows="1" placeholder="Commentaire"></textarea>
            </div>
          </div>
          <div align="right">
            <button class="btn btn-secondary  mb-5">Enregistrer</button>
          </div>
        </form>
    </div>
    <!-- <div class="container ins-container table-responsive col-10">
      <div class="text-nowarp">
        <table class="table table-striped table-hover">
          <thead class="thead-light ">
            <tr>
              <th scope="col">Nom Prénom | Elève <i class="fa fa-sort-asc"></i><br> </th>
              <th scope="col">Date de Naissance <i class="fa fa-sort"></i></th>
              <th scope="col">Genre <i class="fa fa-sort-desc"></i></th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            <tr class="content">
              <th>Jona AGGOUN</th>
              <td>30/01/2007</td>
              <td>Fille</td>
              <td><i class="fa fa-trash"></i></td>
            </tr>
            <tr class="content">
              <th>Sofi AGGOUN</th>
              <td>25/œ/2010</td>
              <td>Garçon</td>
              <td>
                <i class="fa fa-trash"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div align="right" class="mb-4">
        <button type="button" class="btn btn-secondary"><i class="fa fa-plus"></i>  Ajoutez un élève</button>
      </div>
    </div>
    <div class="container ins-container table-responsive col-10">
      <div class="text-nowarp">
        <table class="table table-striped table-hover">
          <thead class="thead-light ">
            <tr>
              <th scope="col">Paiement
                <i class="fa fa-sort-asc"></i>
                <br> </th>
              <th scope="col">Date de Paiement
                <i class="fa fa-sort"></i>
              </th>
              <th scope="col">Montant
              </th>
              <th scope="col">Mode
                <i class="fa fa-sort-desc"></i>
              </th>
              <th scope="col">Reste à payer
              </th>
              <th scope="col">Commentaire
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="content">
              <th>1</th>
              <td>30/01/2007</td>
              <td>150 €</td>
              <td>Chèque</td>
              <td>50 €</td>
              <td>RAS</td>
            </tr>
            <tr class="content">
              <th>2</th>
              <td>25/12/2007</td>
              <td>150 €</td>
              <td>CB</td>
              <td>150 €</td>
              <td>RAS</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div align="right">
        <button class="btn btn-secondary">
        <i class="fa fa-print"></i> Imprimé</button>
        <button type="button" class="btn btn-secondary">
          <i class="fa fa-plus"></i> Ajoutez un élève</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      family: {
        title: '',
        inCharge: null,
        registeredOn: '',
        year: '',
        type: null,
        status: null,
        validatedOn: '',
        code: '',
        comments: ''
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('saveFamily', this.family)
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'listOfFamilies'})
            this.$swal('Dossier pour famille ' + this.family.title + ' est créé avec succès')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de la sauvegarde des détails de ' + this.family.lastname)
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

<style>

</style>
