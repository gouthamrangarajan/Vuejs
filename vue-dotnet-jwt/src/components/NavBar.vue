<template>
    <div>
        <nav class="navbar is-fixed-top is-bold is-info">
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
            <div class="navbar-menu">
              <div class="navbar-end">
                 <a class="navbar-item" @click="ddShow=!ddShow">
                   <div class="dropdown is-active">
                     <div class="dropdown-trigger">
                      Welcome {{userName}}
                    </div>
                    <transition name="fade">
                      <div class="dropdown-menu" v-if="ddShow">
                        <div class="dropdown-content">
                            <a class="dropdown-item" @click="clear">
                              Clear & Logout
                              </a>
                          </div>
                      </div>
                    </transition>
                   </div>
                 </a>
              </div>
            </div>     
        </nav>        
        <side-menu :menuShow="menuShow"></side-menu>        
    </div>
</template>
<script>
import sideMenu from './SideMenu'
import { setTimeout } from 'timers';
export default {
    name:'navBar',
    components:{sideMenu},
    data(){
     return {
        menuShow:false,      
        ddShow:false       
     }
    },
    computed:{
         userName(){
           return this.$store.state.userName;
         }
    },
     watch:{              
        $route (to, from){
            this.menuShow = false;
        }
    },
    mounted(){        
    },
    methods:{
      clear(){
        this.$store.dispatch('clearToken');
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
.dropdown-menu{
  margin-top:0.6rem;
}
</style>
