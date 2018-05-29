<template>
<div class="container col-10 pl-5">
    <div class="homecontainer w-100">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm headingWithSearchBar">
        <strong>Matières</strong>
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
        <router-link role="button" class="btn btn-secondary cursor" tag="a" :to="{name: 'createSubject'}">
          Un Nouveau <i class="fa fa-user-plus"></i>
        </router-link>
        </div>
      </div>
      <div class="table-responsive">
        <table class="col table table-hover table-list-search col-11" id="table_format">
          <thead class="thead-light">
            <tr class="align-text-bottom">
              <th class="text-nowrap" scope="col">Code</th>
              <th class="text-nowrap" scope="col">Matière <i class="fa fa-sort-asc"></i></th>
              <th class="text-nowrap" scope="col">Date d'ajout <i class="fa fa-sort"></i></th>
              <th class="text-nowrap" scope="col">Statut</th>
              <th class="text-nowrap" scope="col"><i class="fa fa-pencil" aria-hidden="true"></i> / <i class="fa fa-eye"></i> </th>
            </tr>
          </thead>
          <tbody v-for="subjectId in filterbyname" :key="subjectId._id"  id="myTable">
            <tr class="content">
              <td>{{subjectId.code}}</td>
              <td>{{subjectId.name}}</td>
              <td>{{subjectId.addedDate}}</td>
              <td><div v-if="subjectId.status">Active</div>
              <div v-else>Terminée</div></td>
              <td class="text-nowrap" @click="viewDetails(subjectId._id)">
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
    ...mapActions([('fetchSubjectList')]),
    ...mapGetters(['subjects']),
    filterbyname () {
      if (this.subjects) {
        return this.subjects.filter(subjectId => {
          return subjectId.name.toLowerCase().includes(this.search.toLowerCase()) || subjectId.code.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  created () {
    return this.fetchSubjectList
  },
  methods: {
    viewDetails (arg) {
      this.$router.push({ name: 'manageSubject', params: { subjectId: arg } })
    }
  }
}
</script>

<style>

</style>
