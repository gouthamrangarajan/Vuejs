<template>
  <div class="frame-holder" @mouseover.stop="showScroll='yes'">
    <ViewportChecker :checkId="id" :action="loadUrl"></ViewportChecker>
    <div :id="id" class="video-container">
      <iframe :scrolling="showScroll" frameBorder="0" :src="iFrameSrc"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {iFrameSrc:'',showScroll:'no'}
  },
   props:{
     id:{
      type:String,
      required:true
    },
     url:{
       type:String,
       required:true
     }
   },
   components:{
      ViewportChecker:()=>import('@/components/ViewportChecker.vue')
   },
   methods:{
     loadUrl(){
        this.iFrameSrc=this.url
     },
     hideScroll(){
       this.showScroll='no'
     }
  },
  mounted(){
    if(window)
      window.addEventListener('mouseover',this.hideScroll)
  },
  destroyed(){
    if(window)
      window.addEventListener('mouseover',this.hideScroll)
  }
}
</script>
<style scoped>

</style>
