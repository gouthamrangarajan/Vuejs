<template>
  <div id="app">
    <div ref="firstEl">
      <first-el></first-el>
    </div>
    <nav-bar :isFixed="isNavBarFixed"></nav-bar>
    <slot name="blog">
    </slot>
  </div>
</template>

<script>
import firstEl from './components/FirstEl.vue'
import navBar from './components/NavBar'
export default {
  name: 'app',
  data(){
    return {isNavBarFixed:false}
  },
  components: {
    firstEl,navBar
  },
   created(){
     window.addEventListener('scroll',this.windowScroll);   
  },
  methods:{
    windowScroll(){
      var det=this.$refs.firstEl.getBoundingClientRect();
       if(-(det.top)>det.height){
        this.isNavBarFixed=true;
      }
      else{
        this.isNavBarFixed=false;
      }
    }
  }
}
</script>

<style>

</style>
