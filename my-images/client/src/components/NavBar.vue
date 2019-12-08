<template>
 <div>
   <nav class="cyan darken-1">  
      <div class="nav-wrapper">
        <a class="brand-logo center">My Photos</a>
      </div>  
  </nav>    
   <a data-target="slide-out" class="sidenav-trigger btn btn-large btn-flat white-text cyan darken-1">
     <i class="material-icons">menu</i>
    </a>
  <ul id="slide-out" class="sidenav">   
      <li :class="{'active cyan':active=='home'}"><router-link to="/" class="waves-effect waves-light">Home</router-link></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Kool Effects</a></li>
      <li :class="{'active cyan':active=='carousel'}"><router-link to="/carousel" class="waves-effect waves-light">Carousel</router-link></li>     
      <li :class="{'active cyan':active=='slider'}"><router-link to="/slider" class="waves-effect waves-light">Slider</router-link></li>   
      <li :class="{'active cyan':active=='fullslider'}"><router-link to="/fullslider" class="waves-effect waves-light">Fullscreen Slider</router-link></li>      
    </ul>
 </div>    
</template>
<script>
export default {
    name:'NavBar',
    mounted(){
         var elems = document.querySelectorAll('.sidenav');
         var instances = M.Sidenav.init(elems, null);
    },
    computed:{
      active(){
        var dt=this.$route;        
        return dt.name;
      }
    },
    watch:{     
    }    
}
</script>
<style scoped>
nav, .sidenav-trigger{
  height: 2.8rem;
  line-height: 2.8rem;
}
.sidenav-trigger{
  position: fixed;
  margin-top:-2.8rem;
  margin-left:-0.5rem;
}
</style>