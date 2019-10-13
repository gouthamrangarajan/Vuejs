<template>
  <div id="app">   
    <nav-bar></nav-bar>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>
<script>
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import NavBar from './components/NavBar'
import AppFooter from './components/AppFooter'
export default {
  name:'app',
  mounted(){
    this.$store.dispatch('posts/refresh');
    this.$store.dispatch('albums/refresh');
    this.$store.dispatch('users/refresh');
    this.$store.dispatch('todos/refresh');
    document.body.classList.add("has-background-white-ter");
  },
  components:{
    NavBar,AppFooter
  },
}
</script>
<style>
#app{
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
}
.fade-move{
  transition:all 0.3s;
}
.fade-enter-active,.fade-leave-active{
  transition:all 0.3s;
}
.fade-enter,.fade-leave-to{
  opacity: 0;  
}
.scale-enter-active,.scale-leave-active{
  transition:all 0.3s;
}
.scale-enter,.scale-leave-to{
  transform: scale(0);  
}
</style>
