<template>
  <div id="app">   
    <nav-bar></nav-bar>
    <div class="routerView">
      <router-view/>
    </div>
  </div>
</template>
<script>
import navBar from './components/NavBar'
export default {
  name:'App',
  components:{navBar}
}
</script>

<style>
.routerView{
  padding-top:4rem;
}
.fade-enter-active,.fade-leave-active{
  transition:all 0.5s;
}
.fade-enter,.fade-leave-to{
  opacity:0;
}
section{
    margin-top:-0.8rem;
}
</style>
