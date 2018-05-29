<template>
<div class="container col-10 pl-5">
    <div class="homecontainer w-100">
      <h4 class="text-nowrap mb-5 text-center w-100 form-control-sm headingWithSearchBar">
        <strong>Liste de famille</strong>
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
        <router-link role="button" class="btn btn-secondary cursor" tag="a" :to="{name: 'createFamily'}">
          Un Nouveau <i class="fa fa-user-plus"></i>
        </router-link>
        </div>
      </div>
      <div class="table-responsive">
        <table class="col table table-hover table-list-search col-11" id="table_format">
          <thead class="thead-light">
            <tr class="align-text-bottom">
              <th class="text-nowrap" scope="col"><input  type="checkbox" name="aggree" value="1"> Select All</th>
              <th class="text-nowrap" scope="col">Nom Responsable</th>
              <th class="text-nowrap" scope="col">Code</th>
              <th class="text-nowrap" scope="col">Année Scolaire</th>
              <th scope="col">
                <select id='filterText' style='display:inline-block' onchange='filterText()'>
                  <option disabled selected>Statut</option>
                  <option value='Validée'>Validée</option>
                  <option value='Attente Paiement'>Attente Paiement</option>
                  <option value='Attente Document'>Attente Document</option>
                  <option value='Terminée'>Terminée</option>
                  <option value='all'>Tout</option>
                </select>
                </th>
              <th scope="col">Type <i class="fa fa-sort-desc"></i>
              </th>
              <th class="text-nowrap" scope="col">Date Inscriptions</th>
            </tr>
          </thead>
          <tbody v-for="family in filterbyname" :key="family._id"  id="myTable">
            <tr class="content"  @click="viewDetails(family._id)">
              <th scope="row">
                <input type="checkbox" v-model="selected" :value="family._id">
              </th>
              <td>{{family.inCharge}}</td>
              <td>{{family.code}}</td>
              <td>{{family.year}}</td>
              <td>{{family.status}}</td>
              <td>{{family.type}}</td>
              <td>{{moment(family.registeredOn).format('L')}}</td>
            </tr>
          </tbody>
        </table>
      <!-- <div>
        <form class="form-check-inline">
            <label class="mr-sm-2" for="inlineFormCustomSelect"></label>
            <select class="custom-select col-7" id="inlineFormCustomSelect">
              <option selected>Envoyer Factures</option>
              <option value="1">Envoyer une relance documents</option>
            </select>
            <button type="submit" class="btn btn-secondary col-3"><span class="fa fa-paper-plane"></span></button>
        </form>
      </div> -->
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
    ...mapActions([('fetchFamiliesList')]),
    ...mapGetters(['families']),
    filterbyname () {
      if (this.families) {
        return this.families.filter(family => {
          return family.title.toLowerCase().includes(this.search.toLowerCase()) || family.code.toLowerCase().includes(this.search.toLowerCase())
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
    return this.fetchFamiliesList
  },
  methods: {
    viewDetails (arg) {
      this.$router.push({ name: 'manageFamily', params: { memberId: arg } })
    }
  }
}
</script>

<style>

</style>
