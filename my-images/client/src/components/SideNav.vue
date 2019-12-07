<template>
 <div>
   <a href="#"  data-target="slide-out" class="sidenav-trigger btn cyan darken-1"><i class="material-icons">menu</i></a>
  <ul id="slide-out" class="sidenav">   
      <li :class="{'active':active=='home'}"><router-link to="/">Home</router-link></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Kool Effects</a></li>
      <li :class="{'active':active=='carousel'}"><router-link to="/carousel">Carousel</router-link></li>     
      <li :class="{'active':active=='slider'}"><router-link to="/slider">Slider</router-link></li>   
      <li :class="{'active':active=='fullslider'}"><router-link to="/fullslider">Fullscreen Slider</router-link></li>      
    </ul>
 </div>    
</template>
<script>
export default {
    name:'SideNav',
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