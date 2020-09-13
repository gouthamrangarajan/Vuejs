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
body::-webkit-scrollbar {
  width: 0.3rem;  
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
body::-webkit-scrollbar-thumb {
  background-color:#00bcd4;
  outline: 1px solid #00bcd4;
  border-radius:5px;
}

.card:hover{
    transform:translateY(-0.25rem);
}
.card:hover~.card{
  transform: translateX(130px);
}
.card:not(:first-child){
  margin-left:-130px;
}
</style>
