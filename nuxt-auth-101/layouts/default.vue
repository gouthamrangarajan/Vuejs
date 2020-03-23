<template>
  <div class="app">
    <app-nav></app-nav>
    <div class="page">
      <nuxt />
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import 'materialize-css/dist/css/materialize.min.css'
if(process.client)
  require('materialize-css/dist/js/materialize.min.js')
export default {
 head(){
   return{
    title:'Nuxt Auth 101',
    meta:[
      {
        hid:'description',
        name:'description',
        content:'Simple app using nuxt auth'
      }
    ]
   }
 },
 components:{
   AppNav,
   AppFooter
 },
}
</script>
<style>
*{
  font-family: 'Roboto', sans-serif;
}
.scale-enter-active,.scale-leave-active{
  transition:all 0.5s;
}
.scale-enter,
.scale-leave-to{
  transform: scale(0);
}
.slide-enter-active,.slide-leave-active{
  transition:all 0.5s;
}
.slide-enter,.slide-leave-to{
  transform: translateX(50rem);
}
.fade-enter-active,
.fade-leave-active{
  transition:all 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.app{
  background-color:rgba(51,51,51,0.08);
}
.page{
 min-height: 68vh;
}
</style>
