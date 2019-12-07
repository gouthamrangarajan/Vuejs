<template>
 <transition name="fade" appear>
   <section>
    <div class="carousel">
      <a class="carousel-item" v-for="num in imgsLen" :href="'#'+num+'!'" :key="num">
        <img :src="'/imgs/'+num">
      </a>    
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
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems,null);
  }
}
</script>
<style scoped>

</style>
