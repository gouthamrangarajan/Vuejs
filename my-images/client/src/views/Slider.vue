<template>
 <transition name="fade" appear>
   <section class="container">
      <div :class="{'slider':true,'fullscreen':isFullScreen}">
    <ul class="slides">
      <li v-for="num in imgLen" :key="num">
        <img :src="'/imgs/'+imgIds[num-1]">
        <div class="caption right-align">       
           <h3>{{sliderImgs[num-1] | localDate}}</h3>   
           <template v-if="isFullScreen">
              <router-link to="/"  class="btn btn-large light-blue darken-4">Home</router-link>
           </template>
        </div>
      </li>
      
    </ul>
  </div>   
   </section>
 </transition>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name:'Slider',
  computed:{
    ...mapGetters(['sliderImgs']),        
    imgIds(){
         return this.sliderImgs.map(el=> el.fileId);
    },
    imgLen(){
      return this.sliderImgs.length;
    },
    isFullScreen(){
      var dt=this.$route.name;
      if(dt=="fullslider")
        return true;
      else
        return false;
    }
  },
  methods:{
    setUpSlider(){
      var elems = document.querySelectorAll('.slider');
      var instances = M.Slider.init(elems, {});
    }
  },
  mounted(){
     this.setUpSlider();
  },
  watch:{
    imgLen(newVal,oldVal){
      this.setUpSlider();
    }
  },
  filters:{
    localDate(val){
      if(val && val.modified){      
        var dat=new Date(val.modified);
        return dat.toLocaleDateString() ;
      }
      else{
        return '';
      }
    }
  }
}
</script>
<style scoped>
 section{
   padding-top:8vh;
 }
</style>
