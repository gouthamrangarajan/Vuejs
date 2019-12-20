<template>
 <section>
 <transition name="fade" appear>
   <div v-if="imgLen>0"> 
    <div class="carousel non-full-width">
      <a class="carousel-item" v-for="num in imgLen"  :key="num">
        <img :src="'/imgs/'+imgIds[num-1]">
      </a>    
    </div>
    <div class="container">
      <div class="carousel carousel-slider">
        <a class="carousel-item" v-for="num in imgLen" :key="num">
          <img :src="'/imgs/'+imgIds[num-1]">
        </a>    
      </div>
    </div>
   </div>
    </transition>
   </section>
</template>
<script>
import {mapGetters,mapState} from 'vuex'
export default {
  name:'Carousel',
  computed:{
    ...mapGetters(['sortedImgModified']),
    ...mapState(['imgLen']),    
    imgIds(){
         return this.sortedImgModified.map(el=> el.fileId);
     }
  },
  watch:{
    imgLen(newVal,oldVal){
      this.setUpCarousel();
    }
  },
  mounted(){        
      this.setUpCarousel();     
  },
  methods:{
    setUpCarousel(){    
        let elems = document.querySelectorAll('.carousel.non-full-width');
        let instances = M.Carousel.init(elems,{});
        elems = document.querySelectorAll('.carousel.carousel-slider');
        instances = M.Carousel.init(elems,{fullwidth:true});
    }
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
