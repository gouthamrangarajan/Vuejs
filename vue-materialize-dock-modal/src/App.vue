<template>
  <div id="app">   
    <nav-bar></nav-bar>
    <div class="main">
      <router-view/>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  name:'App',
  components:{
    NavBar,
    AppFooter
  }
}
</script>
<style>
.main{
  min-height: 66.9vh;
}
#app{  
  font-family: 'Roboto', sans-serif;    
}
.scale-enter-active,
.scale-leave-active{
  transition:all 0.3s;
}
.scale-enter,
.scale-leave-to{
  transform: scale(0);
}
.fade-enter-active,
.fade-leave-active{
  transition:all 0.3s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
