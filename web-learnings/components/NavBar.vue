<template>
  <div class="navbar-fixed">
    <nav class="white">
      <div class="nav-wrapper">
        <a :class="['brand-logo cyan-text text-darken-2',logoLocation]">Web Learnings</a>
         <transition-group tag="ul" class="right" name="fade">
           <li :key="1">
             <AppFilter></AppFilter>
           </li>
          <UserInfo :key="2"></UserInfo>
         </transition-group>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data(){
    return {logoLocation:'center'}
  },
  components:{
    UserInfo:()=>import('@/components/UserInfo.vue'),
    AppFilter:()=>import('@/components/AppFilter.vue')
  },
  mounted(){
    if(window){
      if(window.innerWidth<991)
        this.logoLocation='left'
    }
  },

}
</script>
<style scoped>
nav{
  height: 3rem;
  line-height: 3rem;
}
</style>
