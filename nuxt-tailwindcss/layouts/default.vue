<template>
  <div class="app font-app bg-gray-100 min-h-screen flex flex-col w-screen"> 
    <AppNav></AppNav>
    <div class="main p-4 mt-6">
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  components:{
    AppNav:()=>import('@/components/AppNav.vue')
  }
}
</script>
<style>
body{
  overflow-x:hidden;
}
body::-webkit-scrollbar {
  width: 0.25rem;  
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
body::-webkit-scrollbar-thumb {
  background-color:#68d391;
  outline: 1px solid #68d391;
  border-radius:4px;
}
.records-move{
  transition: all 0.3s;
}
.records-enter-active,
.records-leave-active{
  transition:all 0.3s;
}
.records-enter,
.records-leave-to{
  opacity:0;
  transform:translateY(2rem);
}
.fade-enter-active,
.fade-leave-active{
  transition:all 0.3s;
}
.page-enter-active,
.page-leave-active{
  transition:all 0.5s;
}
.page-enter,
.fade-enter,
.page-leave-to,
.fade-leave-to{
  opacity:0;
}
</style>
