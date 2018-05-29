<template>
<div class="container col-10 pl-5">
    <div class="homecontainer w-100">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm headingWithSearchBar">
        <strong>Ajoutez Matiére dan la classe {{classId.label}}</strong>
      </h4>
      <div class="row">
        <form class="form-group mt-5 col-12" role="search">
          <div class="input-group add-on">
            <input type="text" v-model="search" class="form-control" placeholder="Je cherche quelqu'un.." >
            <div class="input-group-append">
              <div class="btn btn-default btn-outline-secondary" :disabled="!search" @click="search = ''">
                Effacer
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="table-responsive">
        <table class="col table table-hover table-list-search col-11" id="table_format">
          <thead class="thead-light">
            <tr class="align-text-bottom">
              <th class="text-nowrap" scope="col">
               Ajoutez
              </th>
              <th class="text-nowrap" scope="col">Code</th>
              <th class="text-nowrap" scope="col">Nom de Matiére</th>
              <th class="text-nowrap" scope="col">Date d'ajout</th>
              <th scope="col">Statut</th>
            </tr>
          </thead>
          <tbody v-for="subject in filterbyname" :key="subject._id">
            <tr class="content">
              <th scope="row">
                <button type="checkbox" class="btn btn-secondary" @click="selectedId(subject._id)"> <i class="fa fa-plus"></i></button>
              </th>
              <td>{{subject.code}}</td>
              <td>{{subject.name}}</td>
              <td>{{moment(subject.addedDate).format('L')}}</td>
              <td><div v-if="subject.status">Active</div>
              <div v-else>Inactive</div></td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapActions([('fetchSubjectList')]),
    ...mapGetters(['subjects', 'classId']),
    filterbyrole () {
      if (this.subjects) {
        return this.subjects.filter(subject => {
          return subject.status
        })
      }
    },
    filterbyname () {
      if (this.subjects) {
        return this.filterbyrole.filter(subject => {
          return subject.name.toLowerCase().includes(this.search.toLowerCase()) || subject.code.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  created () {
    this.$store.dispatch('fetchClassId', this.$route.params.classId)
    return this.fetchSubjectList
  },
  methods: {
    selectedId (arg) {
      this.$store.dispatch('addDetailInClass', {id: this.$route.params.classId, data: {subjectIds: arg}})
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'manageClass'})
            this.$swal('Matiére est l\'ajoutez')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Erreur lors de l\'ajoutez')
        })
    }
  }
}
</script>

<style>

</style>
