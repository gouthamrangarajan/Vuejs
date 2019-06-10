<template>
<nav :class="{'navbar is-dark':true,
 'is-fixed-top':isFixed}" role="navigation"  aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item"><img src="./../assets/logo.png" /></a>
  </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <a :class="{'navbar-item':true,'is-active':activeMenu==1}" @click="scrollTo('#bx1',1)">
          Header 1
        </a>
          <a :class="{'navbar-item':true,'is-active':activeMenu==2}" @click="scrollTo('#bx2',2)">
          Header 2
        </a>
          <a :class="{'navbar-item':true,'is-active':activeMenu==3}" @click="scrollTo('#bx3',3)">
          Header 3
        </a>         
      </div>
    </div>
</nav>
</template>

<script>
export default {
  name: 'navBar',
  props: {
    isFixed:{
      Type:Boolean,
      Required:false
    }
  },
  data(){
   return {activeMenu:1}
  },
  created(){
    
  },
  methods:{
    scrollTo(id,number){
       window.scrollTo({top: document.querySelector(id).offsetTop
      , behavior: 'smooth' });
      this.activeMenu=number;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
