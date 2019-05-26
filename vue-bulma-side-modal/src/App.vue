<template>
  <div id="app">
   <modal :showModal="showModal" @closeModal="showModal=false"/>
   <div class="container">
      <button class="button is-hovered is-link"
            @click="showModal=!showModal">
      Show Modal</button>     
  </div>
  </div>
</template>

<script>
import modal from './components/modal.vue'

export default {
  name: 'app',
  components: {
    modal
  },
  data(){
    return {showModal:false};
  }
}
</script>

<style>
.container{
  padding-top:2rem;
}
</style>
