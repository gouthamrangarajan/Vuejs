<template>
<transition name="slide">
 <div class="box" v-if="menuOutline">
      <aside class="menu">
     <transition-group name="itemSlide" class="menu-list" tag="ul">     
   <router-link v-for="item in menuList"  :to="item.url" tag="li" 
       :key="item.id" v-show="item.display">       
            <a>{{item.name}}</a>         
       </router-link>         
  </transition-group>
  </aside>   
 </div>
</transition>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    name:'sideMenu',
    data(){
        return {
            menuOutline:false,
                menuList:[        
        {name:'Home',id:1,display:false,url:'/'},
        {name:'About',id:2,display:false,url:'/about'},
        {name:'View1',id:3,display:false,url:'/view1'},
        {name:'View2',id:4,display:false,url:'/view2'},        
      ],
        }
    },
    props:{
        menuShow:{
            type:Boolean,
            required:true
        }
    },
    watch:{
        menuShow(newVal,oldVal){      
            setTimeout(()=>{
                this.menuOutline=newVal;
            },100);      
            this.menuList.forEach((el,ind)=>{
                setTimeout(()=>{
                    el.display=newVal;
                },ind*100);
            });           
        }
    },
    mounted(){
        setTimeout(()=>{
            this.menuOutline=this.menuShow;
        },100);   
        this.menuList.forEach((el,ind)=>{
            setTimeout(()=>{
                el.display=this.menuShow;
            },ind*100);
        });   
    }
}
</script>
<style scoped>
.itemSlide-enter-active,
.itemSlide-leave-active{
  transition:all 0.5s;
}

.itemSlide-enter,
.itemSlide-leave-to{
  transform:translateY(-100rem);
}
.slide-enter-active,
.slide-leave-active{
  transition:all 0.3s;
}

.slide-enter,
.slide-leave-to{
  transform:translateX(-50rem);
}
.router-link-exact-active a{
    background-color: #3273dc;
    color:#fff;
}
.box{
  position:fixed;
  z-index:200;
  margin-top:3.2rem;
  height: 100%;
  width:20rem;
}
</style>

