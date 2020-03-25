<template>
  <div class="grey lighten-4">
    <nav-bar></nav-bar>
      <div class="app">
        <nuxt />
      </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import 'materialize-css/dist/css/materialize.min.css'
if(process.client)
  require('materialize-css/dist/js/materialize.min.js')
export default{
  components:{
    NavBar,
    AppFooter
  },
  created(){
    this.$store.dispatch('users/refresh')
    this.$store.dispatch('albums/refresh')
    this.$store.dispatch('posts/refresh')
    this.$store.dispatch('todos/refresh')
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
  background-color: #f5f5f5 !important;
}
.app{
  min-height: 58vh;
}
.records-move{
  transition:all 0.3s;
}
.records-enter-active{
  transition:all 0.3s;
}
.records-enter,
.records-leave-to{
  transform:translateX(2px);
  opacity:0;
}
.fade-move{
  transition:all 0.3s;
}
.fade-enter-active,
.fade-leave-active{
  transition:all 0.3s;
}
.fade-enter,
.fade-leave-to{
  opacity:0;
}
.mt-reduce-half{
  margin-top:-0.5rem;
}
.mt-reduce-one{
  margin-top:-1rem;
}
.scale-enter-active,
.scale-leave-active
{
  transition:all 0.5s;
}
.scale-enter,
.scale-leave-to{
  transform: scale(0);
}
.slide-enter-active,
.slide-leave-active{
    transition:all 0.5s;
}
.slide-enter,
.slide-leave-to{
    transform: translateX(50rem);
}
</style>
