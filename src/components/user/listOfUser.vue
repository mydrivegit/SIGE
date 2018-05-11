<template>
<b-container class="listofuser" fluid>
  <div class="table-responsive col-12">
    <h5><u>Liste des utilisateurs actifs</u></h5>
    <table class="col table table-light table-hover table-list-search " id="table_format">
      <thead class="thead-light">
        <tr class="align-text-bottom">
          <th class="text-nowrap" scope="col">Username</th>
          <th class="text-nowrap" scope="col">First Name</th>
          <th class="text-nowrap" scope="col">Last Name</th>
          <th class="text-nowrap" scope="col">Voir les détails</th>
          <th class="text-nowrap" scope="col">Inactif</th>
        </tr>
      </thead>
      <tbody id="myTable" v-for="user in users" :key="user._id" v-if="user.status">
        <tr class="content">
          <td>{{user.username}}</td>
          <td>{{user.firstname}}</td>
          <td>{{user.lastname}}</td>
          <td><button @click="viewDetails(user._id)">Vue</button></td>
          <td><button @click="changeUserStatus(user._id)">Utilisateur inactif</button></td>
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
      this.$router.push({ name: 'manageUser', params: { userId: arg } })
    },
    changeUserStatus (arg) {
      let _data = {
        status: false,
        role: 'User'
      }
      this.$store.dispatch('modifyUserIdData', { data: _data, id: arg })
        .then(res => {
          if (res.data) {
            this.$swal('Utilisateur desactivé avec succès')
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
  padding: 20vh 20vh;
}

</style>
