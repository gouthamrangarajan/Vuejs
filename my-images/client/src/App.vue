<template>
  <div id="app" class="grey lighten-4">   
    <transition name="fade">
      <nav-bar v-if="displayNavAndFooter"/>   
    </transition>
    <router-view :key="$route.fullPath"/>  
    <notification></notification>
    <transition name="fade">
      <app-footer v-if="displayNavAndFooter"/>   
    </transition>    
  </div>
</template>
<script>
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import NavBar from '@/components/NavBar.vue'
import Notification from '@/components/Notification.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  name:'App',
  mounted(){    
     this.$store.dispatch('refreshImgInfo');     
  },
  data(){
    return {displayNavAndFooter:true}
  },
  components:{
    NavBar,Notification,AppFooter
  },
  watch:{
    $route(to,from){
       if(to.path.toLowerCase().indexOf("fullslider")>-1){
         this.displayNavAndFooter=false;
       }
       else{
         this.displayNavAndFooter=true;
       }
    }
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
   min-height: 85vh;
   overflow:hidden;   
}
 body {
   scroll-behavior: smooth;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }
</style>
