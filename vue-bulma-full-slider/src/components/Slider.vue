<template>
<section class="hero is-dark is-bold is-fullheight">
  <div class="hero-head">
    <nav-bar></nav-bar>
  </div>
  <div class="hero-body">  
    <div class="container">
      <div class="icons-container">
        <div class="icon button is-dark is-pulled-left" @click="decrementInd">
          <i class="fa fa-angle-left"></i>
        </div>
        <div class="icon button is-dark is-pulled-right" @click="incrementInd">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>      
      <figure class="image">
          <img :src="img" :key="ind"  v-for="(img,ind) in imgs"   :style="styls[ind]"> 
      </figure>          
  </div>
  </div>
</section>
</template>
<script>
import navBar from  './NavBar'
export default {
    name:'Slider',
    components:{
      navBar
    },
    data(){
    return {selInd:0,transition:'slide-left',intr:null,styls:[],strtLen:100};
  },
  methods:{
    incrementInd(){
      if(this.selInd==this.imgs.length-1){
        this.selInd=0;
      }
      else{
        this.selInd++;
      }
      clearInterval(this.intr);
      this.intr=null;
      setTimeout(()=>{          
        this.startSlide();
        },500);
    },
    decrementInd(){      
      if(this.selInd==0){
            this.selInd=this.imgs.length-1;
          }
          else{
            this.selInd--;
          }      
        this.transition='slide-right';
        clearInterval(this.intr);
        this.intr=null;
        setTimeout(()=>{
          this.transition='slide-left';
          this.startSlide();
          },500);
    },
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
  },  
  mounted(){    
    this.startSlide();
  },
  created(){
    this.imgs.forEach((el,ind)=>{
      if(ind==0){
        this.styls.push('transform:translateX(0rem);position:absolute;');    
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
      for(var i=0;i<80;i++){
           setTimeout(()=>{
             this.strtLen++;
           if(this.strtLen<80){
             if(this.transition=="slide-left"){
             this.$set(this.styls,newVal,'transform:translateX('+
                     (80-this.strtLen)+'rem);position:absolute;');
              this.$set(this.styls,oldVal,'transform:translateX(-'+
                     this.strtLen+'rem);position:absolute;');     
             }
             else{
                 this.$set(this.styls,newVal,'transform:translateX(-'+
                        (80-this.strtLen)+'rem);position:absolute;');
              this.$set(this.styls,oldVal,'transform:translateX('+
                     this.strtLen+'rem);position:absolute;');    
             }
           }
           else{
            this.$set(this.styls,newVal,'transform:translateX(0rem);position:absolute;');
             this.$set(this.styls,oldVal,'display:none;position:absolute;');                
           }           
          },5*i);         
      }          
    }
  },
}
</script>
<style scoped>
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
  position:absolute;
   z-index: 200;
   width: 84rem;
   margin-top:-2rem;

}
.image{
  margin-top:-21rem;
}
</style>
