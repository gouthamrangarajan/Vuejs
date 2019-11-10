<template>
  <div id="app">  
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>
<script>
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import NavBar from '@/components/NavBar.vue'
export default {
  name:'App',
  mounted(){
     this.$store.dispatch('refreshImgInfo');     
  },
  components:{
    NavBar
  },
  created(){
    document.body.classList.add("has-navbar-fixed-top");
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
</style>
