<template>
<div class="container col-10 pl-5">
    <div class="homecontainer w-100">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm headingWithSearchBar">
        <strong>Classes</strong>
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
      <div class="row mb-3">
        <div class="dropdown justify-content-left mb-3"  style="padding-left:15px; ">
        <router-link role="button" class="btn btn-secondary cursor" tag="a" :to="{name: 'createClass'}">
          Un Nouveau <i class="fa fa-user-plus"></i>
        </router-link>
        </div>
      </div>
      <div class="table-responsive">
        <table class="col table data-table table-hover table-list-search col-11" id="table_format">
          <thead class="thead-light">
            <tr class="align-text-bottom">
              <th class="text-nowrap" scope="col">Code</th>
              <th class="text-nowrap" scope="col">Nom Classe | Niveau <i class="fa fa-sort-asc"></i></th>
              <th class="text-nowrap" scope="col">Année Scolaire <i class="fa fa-sort"></i></th>
              <th class="text-nowrap" scope="col">Statut</th>
              <th scope="col">Trimestre</th>
              <th class="text-nowrap" scope="col"><i class="fa fa-pencil" aria-hidden="true"></i> / <i class="fa fa-eye"></i> </th>
            </tr>
          </thead>
          <tbody v-for="classId in filterbyname" :key="classId._id"  id="myTable">
            <tr class="content">
              <td>{{classId.code}}</td>
              <td>{{classId.label}}</td>
              <td>{{classId.year}}</td>
              <td><div v-if="classId.status">Overte</div>
              <div v-else>Terminée</div></td>
              <td>
                <div v-if="classId.semester == 1">1ere</div>
                <div v-if="classId.semester == 2">2emé</div>
                <div v-if="classId.semester == 3">3emé</div>
              </td>
              <td class="text-nowrap" @click="viewDetails(classId._id)">
                <i class="fa fa-pencil cursor" aria-hidden="true"></i> / <i class="fa fa-eye cursor"></i>
              </td>
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
      search: '',
      selected: []
    }
  },
  computed: {
    ...mapActions([('fetchClassesList')]),
    ...mapGetters(['classes']),
    filterbyname () {
      if (this.classes) {
        return this.classes.filter(classId => {
          return classId.label.toLowerCase().includes(this.search.toLowerCase()) || classId.code.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  created () {
    return this.fetchClassesList
  },
  methods: {
    viewDetails (arg) {
      this.$router.push({ name: 'manageClass', params: { classId: arg } })
    }
  }
}
</script>

<style>

</style>
