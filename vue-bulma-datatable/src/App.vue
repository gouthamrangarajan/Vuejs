<template>
  <div id="app">
    <navBar></navBar>
    <div class="container">
      <dataTable></dataTable>
    </div>
  </div>
</template>

<script>
import navBar from './components/NavBar'
import dataTable from './components/DataTable'
export default {
  name: 'app',
  components: {
    navBar,
    dataTable
  }
}
</script>

<style>
  .container{
    padding-top:4rem;
  }
</style>
