<template>
  <div class="navbar-fixed">
    <nav class="transparent">
      <div class="nav-wrapper">
        <a :class="['brand-logo cyan-text',logoLocation]">Grocery-list</a>
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

  },
  created(){
    if(process.client){
      if(window.innerWidth<991)
        this.logoLocation='left'
    }
  },

}
</script>
<style scoped>
nav{
  height: 2.8rem;
  line-height: 2.8rem;
}
</style>
