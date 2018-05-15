<template>
<div class="container col-10 pl-5">
    <div class="homecontainer w-100">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm headingWithSearchBar">
        <strong>Membres</strong>
      </h4>
      <div class="row">
        <form class="form-group mt-5 col-12" role="search">
          <div class="input-group add-on">
            <input type="text" v-model="search" class="form-control" placeholder="Je cherche quelqu'un.." >
            <div class="input-group-append">
              <div class="btn btn-default btn-outline-secondary" :disabled="!search" @click="search = ''">
                Clear
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="row mb-3">
          <div class="dropdown justify-content-left" style="padding-left:15px; ">
          <div role="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="col-sm-auto"> Un Nouveau </span> <i class="fa fa-user-plus"></i>
          </div>
            <div class="dropdown-menu">
                <router-link class="cursor dropdown-item" tag="a" :to="{name: 'createStudent'}">
                Élève
                </router-link>
                <router-link class="cursor dropdown-item" tag="a" :to="{name: 'createProf'}">
                Enseignant
                </router-link>
                <router-link class="cursor dropdown-item" tag="a" :to="{name: 'createInCharge'}">
                Responsable de élève
                </router-link>
            </div>
          </div>
      </div>
      <div class="table-responsive">
        <table class="col table table-striped table-hover table-list-search col-11" id="table_format">
          <thead class="thead-light">
            <tr class="align-text-bottom">
              <th class="text-nowrap" scope="col">
                <input v-model="selectAll" type="checkbox">
                 Select All
              </th>
              <th class="text-nowrap" scope="col">Nom Prénom</th>
              <th class="text-nowrap" scope="col">Date de naissance</th>
              <th scope="col">Age</th>
              <th scope="col">
                <select id='searchText' style='display:inline-block' onchange='searchText()'>
                  <option disabled selected>Role</option>
                  <option value='Responsable de élève'>Responsable de élève</option>
                  <option value='Elève'>Elève</option>
                  <option value='Enseignant'>Enseignant</option>
                  <option value='all'>Tout</option>
                </select>
                </th>
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
          <tbody v-for="member in filterbyname" :key="member._id"  id="myTable">
            <tr class="content"  @click="viewDetails(member.page, member._id)">
              <th scope="row">
                <input type="checkbox" v-model="selected" :value="member._id">
              </th>
              <td>{{member.lastname}} {{member.firstname}}</td>
              <td>{{moment(member.dob).format('L')}}</td>
              <td>{{moment().diff(moment(member.dob, "YYYY-MM-DD"), 'years')}}</td>
              <td>{{member.role}}</td>
              <td>{{member.gender}}</td>
              <td>{{member.class}}</td>
              <td><div v-if="member.status">Active</div>
              <div v-else>Inactive</div></td>
            </tr>
          </tbody>
        </table>
      <!-- <form class="form-check-inline">
          <label class="mr-sm-2" for="inlineFormCustomSelect"></label>
          <select class="custom-select col-7" id="inlineFormCustomSelect">
            <option selected>Editer et envoyer bullentins</option>
            <option value="1">Editer les bullentins</option>
            <option value="2">Envoyer Mail</option>
            <option value="3">Envoyer SMS</option>
            <option value="4">Notification d'absence</option>
          </select>
          <button type="submit" class="btn btn-secondary col-3">GO <span class="fa fa-paper-plane"></span></button>
      </form> -->
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
    ...mapActions([('fetchMembersList')]),
    ...mapGetters(['members']),
    filterbyname () {
      if (this.members) {
        return this.members.filter(member => {
          return member.lastname.toLowerCase().includes(this.search.toLowerCase()) || member.firstname.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    selectAll: {
      get () {
        return this.filterbyname ? this.selected.length === this.filterbyname.length : false
      },
      set (value) {
        let selected = []
        if (value) {
          this.filterbyname.forEach((member) => {
            selected.push(member._id)
          })
        }
        this.selected = selected
      }
    }
  },
  created () {
    return this.fetchMembersList
  },
  methods: {
    viewDetails (arg1, arg2) {
      this.$router.push({ name: arg1, params: { memberId: arg2 } })
    }
  }
}
</script>

<style>

</style>
