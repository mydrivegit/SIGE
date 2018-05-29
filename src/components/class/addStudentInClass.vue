<template>
<div class="container col-10 pl-5">
    <div class="homecontainer w-100">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm headingWithSearchBar">
        <strong>Ajoutez élève dan la classe {{classId.label}}</strong>
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
               Ajoutez élève
              </th>
              <th class="text-nowrap" scope="col">Nom Prénom</th>
              <th class="text-nowrap" scope="col">Date de naissance</th>
              <th scope="col">Age</th>
              <th scope="col">Genre</th>
              <th scope="col">
                <select id='searchText1' style='display:inline-block' onchange='searchText1()'>
                  <option disabled selected>Classe</option>
                  <option value='Coran Niv1'>Coran Niv1</option>
                  <option value='Arabe Rawdati'>Arabe Rawdati</option>
                  <option value='Coran Niv2'>Coran Niv2</option>
                  <option value='all'>Tout</option>
                </select>
                </th>
              <th scope="col">Statut</th>
            </tr>
          </thead>
          <tbody v-for="member in filterbyname" :key="member._id">
            <tr class="content">
              <th scope="row">
                <button type="checkbox" class="btn btn-secondary" @click="selectedId(member._id)"> Ajoutez
                </button>
              </th>
              <td>{{member.lastname}} {{member.firstname}}</td>
              <td>{{moment(member.dob).format('L')}}</td>
              <td>{{moment().diff(moment(member.dob, "YYYY-MM-DD"), 'years')}}</td>
              <td>{{member.gender}}</td>
              <td>{{member.class}}</td>
              <td><div v-if="member.status">Active</div>
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
    ...mapActions([('fetchMembersList')]),
    ...mapGetters(['members', 'classId']),
    filterbyrole () {
      if (this.members) {
        return this.members.filter(member => {
          return member.roleStudent && member.status
        })
      }
    },
    filterbyname () {
      if (this.members) {
        return this.filterbyrole.filter(member => {
          return member.lastname.toLowerCase().includes(this.search.toLowerCase()) || member.firstname.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  created () {
    this.$store.dispatch('fetchClassId', this.$route.params.classId)
    return this.fetchMembersList
  },
  methods: {
    selectedId (arg) {
      this.$store.dispatch('addDetailInClass', {id: this.$route.params.classId, data: {studentIds: arg}})
        .then(res => {
          if (res.status === 201) {
            this.$router.push({name: 'manageClass'})
            this.$swal('Élève est l\'ajoutez')
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
