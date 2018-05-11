<template>
<div class="container register">
  <div class="row justify-content-md-center">
    <div class="card-wrapper col-md-5 col-sm-9 col-lg-5 col-xl-5">
      <div class="card fat">
        <div class="card-body">
          <h4 class="card-title text-center">
              Enregistrer un membre
          </h4>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="username" class="sr-only">Identification </label>
              <input class="form-control form-control-sm" v-model="user.username" placeholder="Identification" type="text" autofocus required>
            </div>
            <div class="form-group">
              <label for="lastname" class="sr-only">Nom de famille</label>
              <input class="form-control form-control-sm" v-model="user.lastname" placeholder="Nom de famille" type="text" required>
            </div>
            <div class="form-group">
              <label for="firstname" class="sr-only">Prénom</label>
              <input class="form-control form-control-sm" v-model="user.firstname" placeholder="Prénom" type="text" required>
            </div>
            <div class="form-group">
              <label for="email" class="sr-only">E-Mail Adress</label>
              <input class="form-control form-control-sm" v-model="user.email" placeholder="E-Mail Adress" type="email" required>
            </div>
            <div class="form-group">
              <label for="role" class="sr-only">Rôle</label>
              <b-form-select v-model="user.role" :options="role" class="form-control form-control-sm" aria-required="" />
            </div>
            <div class="form-group">
              <label for="mobileNo" class="sr-only">Numéro de portable</label>
              <input class="form-control form-control-sm" v-model="user.mobileNo" placeholder="Numéro de portable" type="number" required>
            </div>
            <div class="form-group">
              <label for="password" class="sr-only">Password</label>
              <input class="form-control form-control-sm" type="password" v-model="user.password" placeholder="Password" required>
            </div>
            <div class="form-group no-margin">
                <button class="btn btn-secondary btn-block">Register</button>
            </div>
          </form>
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
      user: {
        firstname: '',
        lastname: '',
        email: '',
        mobileNo: '',
        role: null,
        username: '',
        password: ''
      },
      role: this.$store.state.role
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', this.user)
        .then(res => {
          console.log(this.user)
          if (res.status === 201) {
            this.$router.push({name: 'users'})
            this.$swal('Account ' + this.user.username + ' created Succesfully : please login')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Username already exist')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
    padding-top: 10vh;
    padding-left: 5vh;
}

</style>
