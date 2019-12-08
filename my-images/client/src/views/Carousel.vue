<template>
 <transition name="fade" appear>
   <section>
    <div class="carousel non-full-width">
      <a class="carousel-item" v-for="num in imgsLen"  :key="num">
        <img :src="'/imgs/'+num">
      </a>    
    </div>
    <div class="container">
      <div class="carousel carousel-slider">
        <a class="carousel-item" v-for="num in imgsLen" :key="num">
          <img :src="'/imgs/'+num">
        </a>    
      </div>
    </div>
   </section>
 </transition>
</template>
<script>
export default {
  name:'Carousel',
  computed:{
    imgsLen(){return this.$store.state.imgLen;},    
  },
  mounted(){
        let elems = document.querySelectorAll('.carousel.non-full-width');
        let instances = M.Carousel.init(elems,{});
        elems = document.querySelectorAll('.carousel.carousel-slider');
        instances = M.Carousel.init(elems,{fullwidth:true});
  }
}
</script>
<style scoped>
.container{
  padding-bottom: 8vh;
}
a{
  cursor: pointer;
}
</style>
