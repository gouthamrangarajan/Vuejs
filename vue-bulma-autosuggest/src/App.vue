<template>
<div id="app">      
  <section class="hero is-dark is-fullheight is-bold">
    <div class="hero-head">
      <nav-bar>
        <template v-slot:item >  
          <transition name="fade" appear>
            <auto-suggest v-model="navCountry"  v-if="showSearch">      
            </auto-suggest>        
          </transition>
          <transition name="fade" appear>
            <a class="button searchButton" @click="showSearch=!showSearch">
              <span class="icon is-small">
              <i class="fas fa-search"></i>
              </span>
            </a>        
          </transition>     
        </template>          
      </nav-bar>
    </div>
     <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        Vue js, Vuex & Bulma css 
      </h1>     
      <p>
        <span class="subtitle">
          Country:
        </span>                    
        <auto-suggest v-model="selCountry"></auto-suggest>        
      </p>
    </div>
  </div>
  </section>
</div>
</template>

<script>
import navBar from './components/NavBar.vue'
import autoSuggest from './components/AutoSuggest.vue'
export default {
  name: 'app',
  components: {
    navBar,autoSuggest
  },
  data(){
    return {showSearch:false,
            selCountry:'',
            navCountry:''}
  },
  watch:{
    selCountry(newVal,oldVal){
      console.log(newVal);
    },
    navCountry(newVal,oldVal){
      console.log(newVal);
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active{
  transition:all 0.3s;
}
.fade-enter,
.fade-leave-to{
  opacity:0;
}
.container{
  padding-top:4rem;
}

</style>
