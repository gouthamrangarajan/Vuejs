<template>
 <transition name="fade" appear>
   <section class="container">
      <div :class="{'slider':true,'fullscreen':isFullScreen}">
    <ul class="slides">
      <li v-for="(num,ind) in imgsLen" :key="num">
        <img :src="'/imgs/'+num">
        <div class="caption right-align">       
           <h3>{{uploaded[ind] | localDate}}</h3>   
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
export default {
  name:'Slider',
  computed:{
    imgsLen(){return this.$store.state.imgLen;},      
    uploaded(){
        return this.$store.state.imgModified;            
    }, 
    isFullScreen(){
      var dt=this.$route.name;
      if(dt=="fullslider")
        return true;
      else
        return false;
    }
  },
  mounted(){
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, {});
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
