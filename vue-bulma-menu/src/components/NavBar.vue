<template>
<transition name="fade" appear>
    <div  v-if="animateNav">
        <nav :class="['navbar is-fixed-top is-bold',theme]">
            <div class="navbar-brand">
                <a class="navbar-item" @click="menuShow=!menuShow">                  
                <span class="icon is-medium"  v-show="!menuShow">        
                    <transition name="rotateOpp" appear>
                    <i class="fas fa-bars fa-2x"   v-if="!menuShow">
                    </i>
                    </transition>
                </span>            
                <span class="icon"  v-show="menuShow">  
                <transition name="rotate" appear="">
                    <i class="fas fa-times fa-2x" v-if="menuShow"> </i>
                </transition>                         
                </span>              
                </a>
                <a role="button" class="navbar-burger burger icon is-medium" 
                aria-label="menu" @click="themesMenuVisible=!themesMenuVisible">       
                <i class="fas fa-bars fa-2x"></i>         
                </a>
            </div>
        <transition name="slideLess">
            <div :class="{'navbar-menu is-active':true}" v-if="themesMenuVisible">
                <div class="navbar-end">
                <a v-for="theme in themes" 
                    @click="selectTheme(theme.id)"
                    :class="{'navbar-item':true,
                            'is-active':theme.selected==true}"
                    :key="theme.id" >
                    <span :class="theme.value+' tag'">&nbsp;</span>&nbsp;
                    {{theme.name}}
                </a>
                </div>
        </div>
        </transition>
        </nav>        
        <side-menu :menuShow="menuShow"></side-menu>        
    </div>
</transition>
</template>
<script>
import sideMenu from './SideMenu'
import { setTimeout } from 'timers';
export default {
    name:'navBar',
    components:{sideMenu},
    data(){
     return {
        themesMenuVisible:true,menuShow:false,
        themes:[
        {name:'Red',value:'is-danger',id:1,selected:false} ,
        {name:'Light',value:'is-light',id:2,selected:true} ,
        {name:'Black',value:'is-dark',id:3,selected:false} ,
        {name:'Dark Black',value:'is-black',id:8,selected:false} ,
        {name:'Dark Green',value:'is-primary' ,id:4,selected:false} ,
        {name:'Green',value:'is-success' ,id:7,selected:false} ,    
        {name:'Blue',value:'is-info' ,id:5,selected:false} ,        
        {name:'Dark Blue',value:'is-link' ,id:6,selected:false} ,        
      ],
      animateNav:true
     }
    },
    computed:{
        theme(){
            return this.$store.state.theme;
        }    
    },
     watch:{
        theme(newVal,oldVal){            
            this.animateNav=false;
            this.$nextTick(()=>{
                this.animateNav=true;
                this.themes.forEach(el=>el.selected=false);      
                this.themes.filter(el=>el.value==newVal)[0].selected=true;
            });
        },       
        $route (to, from){
            this.menuShow = false;
        }
    },
    mounted(){
        this.themes.forEach(el=>el.selected=false);      
        this.themes.filter(el=>el.value==this.theme)[0].selected=true;
    },
    methods:{
        selectTheme(id){                
            var theme=this.themes.filter(el=>el.id==id)[0].value;
            this.$store.dispatch({type:'setTheme',value:theme});        
        }
    },
}
</script>
<style scoped>
.rotateOpp-enter-active,
.rotateOpp-leave-active{
  transition:all 0.3s;
}

.rotateOpp-enter,
.rotateOpp-leave-to{
  transform:rotate(90deg);
}

.rotate-enter-active,
.rotate-leave-active{
  transition:all 0.3s;
}

.rotate-enter,
.rotate-leave-to{
  transform:rotate(-90deg);
}
.slideLess-enter-active,
.slideLess-leave-active{
  transition:all 0.3s;
}

.slideLess-enter,
.slideLess-leave-to{
  transform:translateY(-4rem);
}
.navbar-burger.burger {
  padding-top:0.6rem;
}
.tag{
  max-height:1rem;
  width:1rem;
}
</style>
