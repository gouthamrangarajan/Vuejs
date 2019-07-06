<template>
  <div id="app">    
    <slider :duration="parseInt(7000)" :imgs="imgs" />   
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

</style>
