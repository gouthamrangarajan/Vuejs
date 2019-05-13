<template>
<section class="hero is-dark is-bold is-fullheight">
  <div class="hero-body">   
      <div class="icons-container">
        <div class="icon button is-link is-pulled-left" @click="decrementInd">
          <i class="fa fa-arrow-left"></i>
        </div>
        <div class="icon button is-link is-pulled-right" @click="incrementInd">
          <i class="fa fa-arrow-right"></i>
        </div>
      </div>      
      <figure class="image">
        <transition :name="transition" mode="out-in" appear>  
            <!-- using image this way instead of instead of sending from app.vue
            the other approach is also possible-->
          <img src="./../../public/imgs/Pic1.png" key="1"  v-if="selInd==0">    
          <img src="./../../public/imgs/Pic2.jpg" key="2"  v-else-if="selInd==1">    
          <img src="./../../public/imgs/Pic3.jpg" key="3"  v-else-if="selInd==2">    
          <img src="./../../public/imgs/Pic4.jpg" key="4"  v-else-if="selInd==3">    
          <img src="./../../public/imgs/Pic5.jpg" key="5"  v-else-if="selInd==4">    
          <img src="./../../public/imgs/Pic6.jpg" key="6"  v-else-if="selInd==5">    
        </transition>  
      </figure>          
  </div>
</section>

</template>
<script>
export default {
    name:'Slider',
    data(){
    return {selInd:0,transition:'slide-left',intr:{}};
  },
  components:{
    
  },
  methods:{
    incrementInd(){
      if(this.selInd==this.length-1){
        this.selInd=0;
      }
      else{
        this.selInd++;
      }
      clearInterval(this.intr);
      setTimeout(()=>{          
        this.startSlide();
        },3000);
    },
    decrementInd(){
      this.$nextTick(()=>{
        if(this.selInd==0){
              this.selInd=this.length-1;
            }
            else{
              this.selInd--;
            }
        });
        this.transition='slide-right';
        clearInterval(this.intr);
        setTimeout(()=>{
          this.transition='slide-left';
          this.startSlide();
          },3000);
    },
    startSlide(){
      this.intr=setInterval(()=>{
            if(this.selInd==this.length-1){
              this.selInd=0;
            }
            else{
              this.selInd++;
            }
          },this.duration);
    }    
  },  
  mounted(){    
    this.startSlide();
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
    
  }
}
</script>
<style scoped>
.slide-right-enter-active{
  animation:slide-in-opp 1s;
}

.slide-right-leave-active{
  animation:slide-out-opp 1s;
}
.slide-left-enter-active{
  animation:slide-in 1s;
}

.slide-left-leave-active{
  animation:slide-out 1s;
}
@keyframes slide-in{
  0%{
    transform:translateX(100rem);
  }
  100%{
    transform:translateX(0);
  }
}
@keyframes slide-out{
  0%{
    transform:translateX(0);
  }
  100%{
    transform:translateX(-100rem);
  }
}
@keyframes slide-in-opp {
  0%{
    transform:translateX(-100rem);
  }
  100%{
    transform: translateX(0rem);
  }
}
@keyframes slide-out-opp {
  0%{
    transform: translateX(0rem);
  }
  100%{
    transform: translateX(100rem);
  }
}
img{
  height: 90vh;
  width: 100rem;
}
.icon{
  opacity: 0.4;
  height: 3rem;
}
.icon:hover{
  opacity: 1;
}
.icons-container{
  position:fixed;
   z-index: 200;
   width: 91.9rem;
}
</style>
