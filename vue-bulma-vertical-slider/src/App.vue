<template>
  <div id="app">
     <section class="hero is-dark is-bold is-fullheight">
     <div class="hero-body">
       <div class="container">
        <h1 class="title">
          Welcome
       </h1>
          <h2 class="subtitle">
          A simple verical slider using Vue transition
        </h2>
        <p class="is-size-7 has-text-warning">
          *images fom NASA
        </p>
        <div class="is-pulled-right slideContainer">
          <slider :imgs="imgs" :duration="parseInt(5000)" />
       </div>         
       </div>
     </div>
  </section>
  </div>
</template>

<script>
import slider from './components/Slider'
export default {
  name: 'app',
  components: {
    slider
  },
  data(){
    return {imgs:['/imgs/Pic1.png','/imgs/Pic2.jpg','/imgs/Pic3.jpg',
                '/imgs/Pic4.jpg','/imgs/Pic5.jpg','/imgs/Pic6.jpg']};
  }
}
</script>

<style>
.slideContainer{
 margin-top:-7rem; 
}
</style>
