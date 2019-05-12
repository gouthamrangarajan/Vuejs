<template>
<div>
  <div class="sliderDiv">
 <figure class="image">      
     <keep-alive>
<transition name="slide-down" mode="out-in" appear>  
    <!-- using image this way instead of instead of sending from app.vue
    the other approach is also possible-->
   <img src="./../../public/imgs/Pic1.png" key="1"  v-if="selInd==0">    
   <img src="./../../public/imgs/Pic2.jpg" key="2"  v-else-if="selInd==1">    
   <img src="./../../public/imgs/Pic3.jpg" key="3"  v-else-if="selInd==2">    
   <img src="./../../public/imgs/Pic4.jpg" key="4"  v-else-if="selInd==3">    
   <img src="./../../public/imgs/Pic5.jpg" key="5"  v-else-if="selInd==4">    
   <img src="./../../public/imgs/Pic6.jpg" key="6"  v-else-if="selInd==5">    
   </transition>  
     </keep-alive>
   </figure>
</div>
<transition name="fade" appear>
<vprogress v-if="showProgress"></vprogress>
</transition>
</div>
</template>
<script>
import vprogress from './VProgress'
export default {
    name:'Slider',
    data(){
    return {selInd:0,showProgress:true};
  },
  components:{
    vprogress
  },
  mounted(){    
    setInterval(()=>{
      if(this.selInd==this.length-1){
        this.selInd=0;
      }
      else{
        this.selInd++;
      }
    },this.duration);
  },
  props:{
    length:
    {
      type:Number,
      required:true
    },
    duration:{
        type:Number,
        required:true
    }
  },
  watch:{
      selInd(newVal,oldVal){
          this.showProgress=false;
          this.$nextTick(()=>{this.showProgress=true});
      }
  }
}
</script>
<style scoped>
.slide-down-enter-active{
  animation:slide-in 1s;
}

.slide-down-leave-active{
  animation:slide-out 1s;
}

@keyframes slide-in{
  0%{
    transform:translateY(-50rem);
  }
  100%{
    transform:translateY(0);
  }
}
@keyframes slide-out{
  0%{
    transform:translateY(0);
  }
  100%{
    transform:translateY(50rem);
  }
}

.sliderDiv{
  overflow:hidden;
  width: 40rem;
  height: 40rem;
}
.fade-enter-active,
.fade-leave-active{
  transition:all 1s;
}
.fade-enter,
.fade-leave-to{
  opacity:0;
}
</style>
