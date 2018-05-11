<template>
  <div id="app">
    <router-view name="navbar"/>
    <router-view name="sidebar"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
