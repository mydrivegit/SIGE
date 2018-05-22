<template>
<div class="container register">
  <div class="row justify-content-md-center">
    <div class="card-wrapper col-md-10 col-sm-8 col-lg-7 col-xl-6">
      <div class="card fat">
        <div class="card-body">
          <h4 class="card-title text-center">
              Détail de l'utilisateur
          </h4>
          <form @submit.prevent="modify">
            <div class="form-group">
              <div class="form-inline">
                <label  class="form-group font-weight-bold col-md-6 justify-content-start text-nowrap" >Identification :</label>
                <div class="form-group col-md-2">
                  <input v-if="show" v-model="users.username" class="form-control form-control-sm"
                  placeholder="Identification" disabled />
                  <div v-else type="text">{{users.username}}</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-inline">
                <label  class="form-group font-weight-bold col-md-6 justify-content-start text-nowrap">Nom de famille :</label>
                <div class="form-group col-md-2">
                  <input v-if="show" v-model="users.lastname" class="form-control form-control-sm"
                  placeholder="Nom de famille" autofocus required/>
                  <div v-else type="text">{{users.lastname}}</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-inline">
                <label  class="form-group font-weight-bold col-md-6 justify-content-start text-nowrap">Prénom :</label>
                <div class="form-group col-md-2">
                  <input v-if="show" v-model="users.firstname" class="form-control form-control-sm"
                  placeholder="Prénom" autofocus required/>
                  <div v-else type="text">{{users.firstname}}</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-inline">
                <label  class="form-group font-weight-bold col-md-6 justify-content-start text-nowrap">E-Mail Adress :</label>
                <div class="form-group col-md-2">
                  <input v-if="show" v-model="users.email" type="email" class="form-control form-control-sm"
                  placeholder="E-Mail Adress" autofocus required/>
                  <div v-else type="text">{{users.email}}</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-inline">
                <label class="form-group font-weight-bold col-md-6 justify-content-start text-nowrap">Rôle :</label>
                <div class="form-group col-md-2">
                  <select  v-model="user.role" v-if="show"  class="form-control form-control-sm" required>
                    <option disabled value='null'>Sélectionnez le rôle......</option>
                    <option value='Admin'>Administrateur</option>
                    <option value='User'>Utilisateur</option>
                  </select>
                  <div v-else type="text">{{users.role}}</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-inline">
                <label  class="form-group font-weight-bold col-md-6 justify-content-start text-nowrap">Numéro de portable :</label>
                <div class="form-group col-md-1">
                  <input v-if="show" v-model="users.mobileNo" class="form-control form-control-sm"
                  placeholder="Numéro de portable" autofocus required/>
                  <div v-else type="text">{{users.mobileNo}}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6" v-if="show">
                <div class="form-group">
                  <div class="input-group btn-group">
                    <input type="button" class="col-md-12 form-control btn btn-sm btn-outline-secondary" value="Modify" @click="show=!show">
                  </div>
                </div>
              </div>
              <div class="col-md-12 " v-else>
                <div class="form-group">
                  <div class="input-group btn-group">
                    <input type="button" class="col-md-12 form-control btn btn-sm btn-outline-secondary" value="Modify" @click="show=!show">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group btn-group">
                    <button  v-if="show" class="form-control btn btn-sm btn-outline-secondary">Update</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!show" class="form-group">
              <div class="input-group btn-group">
                <input type="button" @click="managePassword(users._id)" class="col-md-12 form-control btn btn-sm btn-outline-danger" value="Gérer le mot de passe">
              </div>
            </div>
          </form>
        </div>
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
      show: false
    }
  },
  created () {
    this.$store.dispatch('fetchUserId', this.$route.params.userId)
  },
  computed: {
    ...mapGetters({
      users: 'userId'
    })
  },
  methods: {
    modify () {
      this.$store.dispatch('modifyUserIdData', {data: this.users, id: this.$route.params.userId})
        .then(res => {
          if (res.data) {
            this.$swal('User details altered Succesfully')
            window.location.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    managePassword (arg) {
      this.$router.push({ name: 'managePassword', params: { userId: arg } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
    padding-left: 20vh;
    padding-top: 10vh;
}

</style>
