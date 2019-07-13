<template>
<transition name="slide">
 <div class="box" v-if="menuOutline">
      <aside class="menu">
     <transition-group name="itemSlide" class="menu-list" tag="ul">     
   <router-link v-for="item in menuList"  :to="item.url" tag="li" 
       :key="item.id" v-show="item.display">       
            <a>{{item.name | capitalize}}</a>         
       </router-link>         
       <li key="hr_1"><hr/></li>
     <router-link tag="li" key="reg_1" to="/"><a>Register New</a></router-link>
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
            menuList:[]        
        }
    },   
    computed:{
          screens(){             
              return this.$store.state.screens;            
          }
    },
    filters:{
        capitalize(val){            
            return val.substring(0,1).toUpperCase()+val.substring(1);
        }
    },
    props:{
        menuShow:{
            type:Boolean,
            required:true
        }
    },
    watch:{
        screens:{
            deep:true,
            handler(newVal,oldVal){
                this.menuList.splice(0);
                newVal.forEach((el,ind)=>{
                    this.menuList.push({id:ind+1,url:'/'+el,name:el,display:false});
                });
            }
        },
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
        this.screens.forEach((el,ind)=>{            
            this.menuList.push({id:ind+1,url:'/'+el,name:el,display:false});
        });
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
  z-index:999;
  margin-top:3.2rem;
  height: 100%;
  width:20rem;
}
</style>

