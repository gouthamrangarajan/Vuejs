<template>
  <div id="app">
   <nav-bar>
      <template v-slot:item >  
       <transition name="fade" appear>
    <auto-suggest 
                 v-model="navCountry"  v-if="showSearch">      
    </auto-suggest>        
      </transition>
      <transition name="fade" appear>
         <a class="button searchButton"
            @click="showSearch=!showSearch">
    <span class="icon is-small">
      <i class="fas fa-search"></i>
    </span>
  </a>        
      </transition>     
    </template>          
   
   </nav-bar>
   <div class="container">
     <div class="field">      
     <label class="label">Country:</label>   
        <auto-suggest 
                 v-model="selCountry">      
    </auto-suggest>
     </div>
   </div>
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
