<template>
<nav class="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">  
    <a class="navbar-item">
      Vue DataTable
    </a>   
  </div>
  <div class="navbar-menu">
     <div class="navbar-end">
         <a class="navbar-item">data Datatable.net</a>
       </div>
    </div>
    </nav>
 </template>

<script>
export default {
  name: 'NavBar',
  props: {
    
  },
  mounted(){
    document.body.classList.add("has-navbar-fixed-top");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
