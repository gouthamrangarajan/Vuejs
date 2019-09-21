<template>
  <div id="app">
   <nav-bar></nav-bar>
   <div class="container">
    <data-table></data-table>
   </div>
  </div>
</template>

<script>
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import NavBar from './components/NavBar.vue'
import DataTable from './components/DataTable.vue'
export default {
  name: 'app',
  components: {
    NavBar,DataTable
  },
  mounted(){
    
  }
}
</script>

<style>
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
