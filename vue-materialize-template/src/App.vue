<template>
  <div id="app">    
    <div class="row">
      <div class="col s12">
        <side-nav v-model="navWidth"/>
        <settings></settings>
        <div class="router-view" :style="routerViewStyle">
          <nav-bar></nav-bar>          
          <router-view/>          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SideNav from '@/components/SideNav.vue'
import NavBar from '@/components/NavBar.vue'
import Settings from '@/components/Settings.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
export default {
  name:'App',
  components:{
    SideNav,
    NavBar,
    Settings
  },
  data(){
    return {navWidth:20}
  },
  mounted(){
    if(window.innerWidth<1024)
      this.navWidth=2
  },
  computed:{
    routerViewStyle(){
      return{marginLeft:(this.navWidth+0.5)+'rem'}
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
*{
  font-family: 'Roboto', sans-serif;
}
body{
  background-color: #f5f5f5;
}
.fade-enter-active,.fade-leave-active{
  transition:all 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
