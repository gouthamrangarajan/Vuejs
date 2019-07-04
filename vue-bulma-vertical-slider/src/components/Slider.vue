<template>
<div>
  <div class="sliderDiv">
 <figure class="image">      
   <img :src="img" :key="ind"  v-for="(img,ind) in imgs"   :style="styls[ind]">    
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
    return {selInd:0,showProgress:true,styls:[],strtLen:100,intr:null};
  },
  components:{
    vprogress
  },
mounted(){    
    this.startSlide();
  },
  created(){
    this.imgs.forEach((el,ind)=>{
      if(ind==0){
        this.styls.push('transform:translateY(0rem);position:absolute;');    
      }
      else{        
        this.styls.push('display:none;position:absolute;');
      }
    });    
  },
   props:{
    imgs:
    {
      type:Array,
      required:true
    },
    duration:{
        type:Number,
        required:true
    }
  },
  watch:{
      selInd(newVal,oldVal){
          this.strtLen=0;
          for(var i=0;i<40;i++){
              setTimeout(()=>{
                this.strtLen++;
              if(this.strtLen<40){                
                this.$set(this.styls,newVal,'transform:translateY(-'+
                        (40-this.strtLen)+'rem);position:absolute;');
                  this.$set(this.styls,oldVal,'transform:translateY('+
                        this.strtLen+'rem);position:absolute;');                                    
              }
              else{
                this.$set(this.styls,newVal,'transform:translateY(0rem);position:absolute;');
                this.$set(this.styls,oldVal,'display:none;position:absolute;');                
              }           
              },5*i);         
          }          
          this.showProgress=false;
          this.$nextTick(()=>{this.showProgress=true});
      }
  },
  methods:{
     startSlide(){
      if(this.intr==null){
        this.intr=setInterval(()=>{
              if(this.selInd==this.imgs.length-1){
                this.selInd=0;
              }
              else{
                this.selInd++;
              }
            },this.duration);
      }    
    }
  }
}
</script>
<style scoped>
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
