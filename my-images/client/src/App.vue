<template>
  <div id="app" class="grey lighten-4">   
    <side-nav/>   
    <router-view :key="$route.fullPath"/>
    <notification></notification>
  </div>
</template>
<script>
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import SideNav from '@/components/SideNav.vue'
import Notification from '@/components/Notification.vue'
export default {
  name:'App',
  mounted(){    
     this.$store.dispatch('refreshImgInfo');     
  },
  components:{
    SideNav,Notification
  },
  created(){

  }
}
</script>
<style>
.fade-move{
  transition:all 0.3s;
}
.fade-enter-active,
.fade-leave-active{
  transition:all 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
#app{
  font-family: 'Roboto', sans-serif;
}
section{
   height: 95vh;
   overflow-Y: auto;
   overflow-X:hidden;
   scroll-behavior: smooth;
}
</style>
