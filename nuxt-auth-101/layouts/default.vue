<template>
  <div>
    <app-nav v-if="loggedIn"></app-nav>
    <nuxt />
  </div>
</template>
<script>
import AppNav from '@/components/AppNav.vue'
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
   AppNav
 },
 computed:{
   loggedIn(){
     return this.$auth.loggedIn;
   }
 }
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
  transition:all 0.3s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}

</style>
