<template>
  <div class="font-app main">
    <Nuxt />
  </div>
</template>
<script>
export default {
  head(){
    return {
      title:'Goutham Rangarajan - Portfolio',
      meta:[
        {name:'description',hid:'description',content:'Goutham Rangarajan Portfolio'}
      ]
    }
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active{
  transition:all 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.main{
  overflow: hidden;
}
</style>
