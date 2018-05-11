<template>
<div class="register">
      <div class="container ">
          <div class="row justify-content-md-center">
              <div class="card-wrapper col-md-8 col-sm-6 col-lg-5 col-xl-5">
                  <div class="card fat">
                      <div class="card-body">
                          <h4 class="card-title text-center font-weight-bold text-uppercase">
                              Gérer le mot de passe <br> {{ users.lastname }} {{ users.firstname }}
                          </h4>
                          <form @submit.prevent="modify">
                              <div class="form-group">
                                  <div class="form-inline">
                                      <label  class="form-group font-weight-bold col-md-5 justify-content-start text-nowrap" >Mot de passe :</label>
                                      <div class="form-group col-md-2">
                                          <input v-model="passwords.password" type="password" class="form-control form-control-sm"
                                          placeholder="Mot de passe" required />
                                      </div>
                                  </div>
                              </div>
                              <div class="form-group">
                                <div class="input-group btn-group">
                                  <button class="form-control btn btn-sm btn-outline-secondary">Modifier</button>
                                </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      passwords: {
        password: ''
      }
    }
  },
  created () {
    this.$store.dispatch('fetchUserId', this.$route.params.userId)
  },
  computed: {
    users () {
      return this.$store.getters.userId
    }
  },
  methods: {
    modify () {
      this.$store.dispatch('modifyUserIdData', {data: this.passwords, id: this.$route.params.userId})
        .then(res => {
          if (res.data) {
            this.$swal('Le mot de passe utilisateur est modifié')
            this.$router.push({ name: 'manageUser', params: this.users._id })
          }
        })
        .catch(err => {
          this.$swal('Le mot de passe utilisateur est modifié pas')
          console.log(err)
        })
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
