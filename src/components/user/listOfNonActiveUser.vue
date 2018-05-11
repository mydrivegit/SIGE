<template>
<b-container class="listofuser" fluid>
  <div class="table-responsive col-12">
    <h5><u>Liste des utilisateurs inactifs</u></h5>
    <table class="col table table-striped table-hover table-list-search " id="table_format">
      <thead class="thead-light">
        <tr class="align-text-bottom">
          <th class="text-nowrap" scope="col">Username</th>
          <th class="text-nowrap" scope="col">First Name</th>
          <th class="text-nowrap" scope="col">Last Name</th>
          <th class="text-nowrap" scope="col">Activer l'utilisateur</th>
        </tr>
      </thead>
      <tbody id="myTable" v-for="user in users" :key="user._id" v-if="!user.status">
        <tr class="content">
          <td>{{user.username}}</td>
          <td>{{user.firstname}}</td>
          <td>{{user.lastname}}</td>
          <td><button @click="changeUserStatus(user._id)">Activer l'utilisateur</button></td>
        </tr>
        </tbody>
    </table>
    </div>
</b-container>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('fetchUsersList')
  },
  methods: {
    viewDetails (arg) {
      console.log(arg)
      this.$router.push({ name: 'manageUser', params: { userId: arg } })
    },
    changeUserStatus (arg) {
      let _data = {
        status: true
      }
      this.$store.dispatch('modifyUserIdData', { data: _data, id: arg })
        .then(res => {
          if (res.data) {
            this.$swal('Utilisateur activé avec succès')
            window.location.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    users () {
      return this.$store.getters.users
    }
  }

}
</script>

<style>
.listofuser {
  padding-left: 14vh;
  padding-top: 20vh;
}

</style>
