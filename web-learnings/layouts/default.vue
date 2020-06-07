<template>
  <div class="app grey lighten-4">
    <NavBar></NavBar>
    <div class="main">
        <nuxt />
    </div>
    <AppFooter></AppFooter>
  </div>
</template>
<script>
import AppFooter from '@/components/AppFooter.vue'
import 'materialize-css/dist/css/materialize.min.css'
if(process.client)
  require('materialize-css/dist/js/materialize.min.js')
export default {
  head(){
    return{
      title:'web learnings',
      meta:[
        {hid:'description',name:'description',content:'collection of all learning materials for html,css,vuejs,javascript etc.'}
      ]
    }
  },
  components:{
    NavBar:()=>import ('@/components/NavBar.vue'),
    AppFooter
  },
}
</script>
<style>
*{
  font-family: 'Roboto', sans-serif;
}
.records-move{
  transition: all 0.3s;
}
.records-enter-active,
.records-leave-active{
  transition: all 0.3s;
}
.records-enter,
.records-leave-to{
  transform: translateX(2rem);
  opacity: 0;
}
.fade-move{
  transition: all 0.5s;
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
input{
   border-bottom:1px solid #9e9e9e!important;
 }
.main{
   min-height: 75vh;
 }
</style>
