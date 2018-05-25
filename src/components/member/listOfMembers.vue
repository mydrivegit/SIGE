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
              <!-- <th scope="col">Statut</th> -->
              <th scope="col" class="text-nowrap"><i class="fa fa-pencil" aria-hidden="true"></i> / <i class="fa fa-eye"></i></th>
            </tr>
          </thead>
          <tbody v-for="member in filterbyname" :key="member._id"  id="myTable">
            <tr class="content">
              <th scope="row">
                <input type="checkbox" v-model="sendEmail.emails" :value="member.email">
              </th>
              <td>{{member.lastname}} {{member.firstname}}</td>
              <td>{{moment(member.dob).format('L')}}</td>
              <td>{{moment().diff(moment(member.dob, "YYYY-MM-DD"), 'years')}}</td>
              <td>{{member.role}}</td>
              <td>{{member.gender}}</td>
              <td>{{member.class}}</td>
              <!-- <td><div v-if="member.status">Active</div>
              <div v-else>Inactive</div></td> -->
              <td class="text-nowrap"  @click="viewDetails(member.page, member._id)">
                <i class="fa fa-pencil cursor" aria-hidden="true"> /</i> <i class="fa fa-eye cursor"></i>
              </td>
            </tr>
          </tbody>
        </table>
      <div class="form-check-inline">
          <select class="custom-select col-8" id="inlineFormCustomSelect">
            <!-- <option selected>Editer et envoyer bullentins</option>
            <option value="1">Editer les bullentins</option> -->
            <option value="2">Envoyer Mail</option>
            <!-- <option value="3">Envoyer SMS</option> -->
            <!-- <option value="4">Notification d'absence</option> -->
          </select>
          <a href="#myModal" data-toggle="modal" class="btn btn-secondary col-4">GO <span class="fa fa-paper-plane"></span></a>
      </div>
        <div id="myModal" class="modal fade text-center">
          <div class="modal-dialog">
            <div class="col-12 main-section">
              <div class="modal-content">
                <div class="col-lg-12 col-sm-12 col-12 subject-name">
                  <h6>Enyvoyer Mail</h6>
                  <button type="button" class="close" data-dismiss="modal">×</button>
                </div>
                <div class="col-lg-12 col-sm-12 col-12 form-input">
                  <form @submit.prevent="send">
                    <div class="form-row">
                      <div class="col-md-12 mb-4">
                        <label for="" class="sr-only">Sujet</label>
                        <input v-model="sendEmail.title" type="text" class="form-control is-valid" placeholder="Sujet">
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-12 mb-4">
                        <label for="" class="sr-only">Statut</label>
                        <textarea v-model="sendEmail.content" class="form-control is-valid" placeholder="Message"
                        rows="5"></textarea>
                      </div>
                    </div>
                    <div align="center">
                      <button class="btn btn-secondary col-3">
                        <span class="fa fa-paper-plane"></span>
                        Envoyer</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      selected: [],
      sendEmail: {
        emails: [],
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapActions([('fetchMembersList')]),
    ...mapGetters(['members']),
    filterbyrole () {
      if (this.members) {
        return this.members.filter(member => {
          return member.status
        })
      }
    },
    filterbyname () {
      if (this.members) {
        return this.filterbyrole.filter(member => {
          return member.lastname.toLowerCase().includes(this.search.toLowerCase()) || member.firstname.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    selectAll: {
      get () {
        return this.filterbyname ? this.sendEmail.emails.length === this.filterbyname.length : false
      },
      set (value) {
        let selected = []
        if (value) {
          this.filterbyname.forEach((member) => {
            selected.push(member.email)
          })
        }
        this.sendEmail.emails = selected
      }
    }
  },
  created () {
    return this.fetchMembersList
  },
  methods: {
    viewDetails (arg1, arg2) {
      this.$router.push({ name: arg1, params: { memberId: arg2 } })
    },
    send () {
      this.$store.dispatch('sendEmail', this.sendEmail)
        .then(res => {
          console.log(res)
          if (res.request.status === 200) {
            this.$router.push({name: 'listOfMembers'})
            this.$swal('envoyer un e-mail aux membres sélectionnés')
            this.sendEmail.emails = ''
            this.sendEmail.title = ''
            this.sendEmail.content = ''
            window.location.reload()
          }
        })
        .catch(err => {
          this.$swal('Erreur lors de l\'envoi du mail')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.main-section{
  margin: 0 auto;
  margin-top:100px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0px;
}
.subject-name{
    margin:10px 0px;
  }
.subject-name button{
  position: absolute;
  top:-50px;
  right:20px;
  font-size:30px;
}
.form-input button{
  width: 100%;
  margin-bottom: 20px;
}
</style>
