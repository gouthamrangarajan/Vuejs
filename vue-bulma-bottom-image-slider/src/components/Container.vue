<template>
<transition name="imgs" appear>
    <section>
  <div v-for="(outInd,outKey) in outerLoop" 
       class="columns is-gapless imgs" :key="outKey">
  <figure class="image column"
          v-for="ind in innerLoop(outInd)"
          :key="imgs[(outInd-1)*5+(ind-1)].id" 
          >
    <img :src="imgs[(outInd-1)*5+(ind-1)].src"/>
  </figure>
  </div>
  </section>
</transition>
</template>
<script>
export default {
    name:'Container',
    props:{
        imgs:{
            type:Array,
            required:true
        }
    },
    computed:{   
        outerLoop(){
            return Math.ceil(this.imgs.length/5);
        }
    },
    methods:{
        innerLoop(outerLoopNum){    
            var maxInd=(outerLoopNum-1)*5+(5-1);    
            if(this.imgs.length> maxInd)
            return 5;
            else
            return this.imgs.length-(outerLoopNum-1)*5;    
        }
  },
}
</script>
<style scoped>
.imgs-enter-active,
.imgs-leave-active{
  transition:all 1s;
}

.imgs-enter,
.imgs-leave-to{
  opacity:0;
  transform:translateX(1rem);
}
section{
  margin-bottom:10.1rem;
}
.imgs img{
  height:18.8rem;
  cursor:pointer;
}
</style>