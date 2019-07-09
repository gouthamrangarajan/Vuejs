<template>
  <div id="app"> 
    <transition name="fade" appear>   
    <nav-bar v-if="screens.length>0"></nav-bar>
    </transition>
    <router-view/>
  </div>
</template>
<script>
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import navBar from './components/NavBar'
export default {
  name:'app',
  components:{navBar}, 
  created(){
    this.$store.commit('initialiseStore');
  },
  mounted(){

  },
  computed:{
    screens(){
      return this.$store.state.screens;
    }
  },
  watch:{
    $route(newVal,oldVal){          
      var ft=this.screens.filter(el=>newVal.path.replace("/","").indexOf(el)>-1);      
      if(ft.length==0 && newVal.path!="/"){
        if(this.screens.length>0){
          this.$router.push(this.screens[0]);
        }
        else{
          this.$router.push('/');
        }
      }
    },
    screens:{
      deep:true,
      handler(newVal,oldVal){
        if(newVal.length==0){
          this.$router.push('/');
        }
      }
    }  
  }
}
</script>

<style>
.fade-enter-active,.fade-leave-active{
  transition:all 0.5s;
}
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.scale-enter-active,.scale-leave-active{
    transition:all 0.5s;
}
.scale-enter,.scale-leave-to{
    transform: scale(0);
}
</style>
