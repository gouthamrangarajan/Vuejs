<template>
     <div class="slider columns is-gapless is-mobile"
        :style="imgStyle">
      <figure class="image column"
          v-for="(img,ind) in lclImgs"
          :key="ind"
              >
    <img :src="img.src"/>
  </figure>
    </div>
</template>
<script>
export default {
    name:'BottomSlider',
    props:{
    imgs:{
      required:true,
      type:Array
    }
  }, 
  created(){
    this.maxTranslate=-(this.imgs.length)*20;
    this.imgs.forEach(el=>{this.lclImgs.push(el)});
    this.imgs.slice(0,5).forEach(el=>{this.lclImgs.push(el);})
    setInterval(()=>{      
      if(this.translate==this.maxTranslate){
        this.translate =0;
      }
      for(var i=1;i<=20;i++){
       setTimeout(()=>{
          this.translate--;            
        },i*30);
      }
    },3000);
  },
  data(){
    return {translate:0,maxTranslate:0,lclImgs:[]}
  },  
  computed:{
    imgStyle(){
      var dt= {transform:"translateX("+this.translate+"rem)"};      
      return dt;      
    }
  }
}
</script>
<style scoped>
.slider{
  position:fixed;
  bottom:0;
  height:10rem;
  overflow:hidden;
  background:#fff;
  z-index:50;
}
.slider .column{
  width:20rem!important;
}
.slider img{
  height:10rem!important;     
}

</style>