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
  .fade-move{
  transition: all 0.5s;
}
 .fade-enter-active{
  transition:opacity 0.5s;
}
.fade-enter,.fade-leave-to{
  opacity: 0;
}

</style>
