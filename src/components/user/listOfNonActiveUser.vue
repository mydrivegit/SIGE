<template>
<div class="listofNonActiveuser" fluid>
  <div class="table-responsive col-12">
    <h5><u>Liste des utilisateurs inactifs</u></h5>
    <table class="col table table-hover table-list-search " id="table_format">
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
          <td><button class="btn btn-secondary" @click="changeUserStatus(user._id)">Activer l'utilisateur</button></td>
        </tr>
        </tbody>
    </table>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created () {
    return this.fetchUsersList
  },
  methods: {
    viewDetails (arg) {
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
    ...mapActions([('fetchUsersList')]),
    ...mapGetters(['users'])
  }

}
</script>

<style>
.listofNonActiveuser {
  padding-left: 23vh;
  padding-top: 15vh;
}

</style>
