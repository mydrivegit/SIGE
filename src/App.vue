<template>
  <div id="app">
    <router-view name="sidebar"/>
    <router-view name="navbar"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.ins-container {
  position: relative;
  top: 25px;
  left: 35px;
  justify-content: space-around;
}
.cursor {
  cursor: pointer;
}
</style>
