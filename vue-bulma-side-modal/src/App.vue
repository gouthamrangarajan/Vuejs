<template>
  <div id="app">
    <navBar></navBar>
   <modal :showModal="showModal" @closeModal="showModal=false"/>
   <div class="container">
      <button class="button is-hovered is-primary"
            @click="showModal=!showModal">
      Show Modal</button>     
  </div>
  </div>
</template>

<script>
import modal from './components/Modal'
import navBar from './components/NavBar'
export default {
  name: 'app',
  components: {
    modal,navBar
  },
  data(){
    return {showModal:false};
  }
}
</script>

<style>
.container{
  padding-top:4rem;
}
</style>
