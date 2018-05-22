<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent" aria-expanded="ture" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <!-- <li class="nav-item">
        <router-link class="nav-link borderLineRight" data-toggle="collapse" data-target=".navbar-collapse.show" tag="li" :to="{name: ''}"></router-link>
      </li> -->
    </ul>
    <ul class="navbar-nav mr-end">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-uppercase text-nowrap" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{users.username}}
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item cursor" data-toggle="collapse" data-target=".navbar-collapse.show" tag="li"
          @click="viewDetails (users._id)" >Profile</a>
          <router-link v-if="users.role" class="dropdown-item cursor" data-toggle="collapse"
        data-target=".navbar-collapse.show" tag="li" :to="{name: 'listOfUser'}">
        Liste des utilisateurs actifs</router-link>
          <router-link v-if="users.role" class="dropdown-item cursor" data-toggle="collapse"
        data-target=".navbar-collapse.show" tag="li" :to="{name: 'listOfNonActiveUser'}">
        Liste des utilisateurs inactifs</router-link>
          <router-link v-if="users.role" class="dropdown-item cursor" data-toggle="collapse"
        data-target=".navbar-collapse.show" tag="li" :to="{name: 'listOfNonActiveMembers'}">
        Liste des Membres inactifs</router-link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item cursor" @click="logout">Log Out</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      data: {
        Admin: 'ture'
      }
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
      .then(res => {
        this.users = res.data.content['0']
      })
      .catch((err) => {
        this.$router.push({ name: 'login' })
        console.log(err)
      })
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    },
    viewDetails (arg) {
      this.$router.push({ name: 'manageUser', params: { userId: arg } })
    }
  }
}
</script>

<style>
.borderLineRight{
  border-right: 1px solid lightgray;
  cursor: pointer;
}
.borderLineLeft{
  border-left: 1px solid lightgray;
}
.cursor{
  cursor: pointer;
}
</style>
