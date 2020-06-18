<template>
  <div class="app">
    <div class="overlay"></div>
    <NavBar></NavBar>
     <nuxt />
  </div>
</template>
<script>
import 'materialize-css/dist/css/materialize.min.css'
if(process.client)
  require('materialize-css/dist/js/materialize.min.js')
export default {
  components:{
    NavBar:()=>import('@/components/NavBar.vue')
  },
  created(){
    if(process.client){
      this.$store.dispatch('initialize')
    }
  }
}
</script>
<style>
*{
  font-family: 'Roboto', sans-serif;
}

.app{
  background-image:  url('~../assets/bck1.jpeg');
  min-height: 100vh;
  background-repeat: no-repeat;
}
.overlay{
  background-color: rgba(0,0,0,0.7);
   position: fixed;
   width:100vw;
   height: 100vh;
}
.fade-move{
  transition: all 0.3s;
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
