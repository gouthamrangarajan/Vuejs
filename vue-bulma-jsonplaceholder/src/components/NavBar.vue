<template>
<transition name="fade">
    <nav class="navbar is-fixed-top is-transparent" v-if="showNavBar">
        <div class="container">
                    <div class="navbar-brand">                      
                        <span class="navbar-burger icon"  @click="showMenuItems=!showMenuItems">
                            <i class="fas fa-bars fa-2x"></i>
                        </span>
                    </div>
                    <div id="navbarMenu" class="navbar-menu is-active">
                        <div class="navbar-start">
                            <transition  name="slide" appear>
                              <div class="navbar-item"  v-show="showMenuItems">
                                <input class="input is-rounded" type="text" placeholder="Search..." v-model.trim="search">
                              </div>
                            </transition>
                        </div>
                        <div class="navbar-end">                            
                            <transition name="slide" appear>
                                <div class="tabs is-right" v-show="showMenuItems">
                                    <ul>
                                        <li v-for="item in menuItems" :key="item.id" :class="{'is-active':item.active}">
                                            <router-link :to="item.to">{{item.name}}</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </transition>
                        </div>
                    </div>
        </div>
    </nav>
</transition>
</template>
<script>
export default {
    name:'NavBar',
    created(){
        document.body.classList.add("has-navbar-fixed-top");
    },    
    data(){
        return {menuItems:[{to:"/",active:false,id:1,name:'Home'},
        {to:"/posts",active:false,id:2,name:'Posts'},
        {to:"/albums",active:false,id:3,name:'Albums'},
        {to:"/users",active:false,id:4,name:'Users'},
        {to:'/todos',active:false,id:5,name:'Todos'}
        ],showMenuItems:true,showNavBar:true}
    },
    watch:{
        '$route':{
            immediate:true,
            handler(to,from){
                this.menuItems.forEach(el=>el.active=false);              
                this.menuItems.filter(el=>el.to==to.fullPath)[0].active=true;    
                if(this.menuItems[0].active==true){
                    this.showNavBar=false;
                }   
                else{
                    this.showNavBar=true;
                }
                this.$store.dispatch('search',"");         
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 400);
            }
        }
    },
    computed:{
        search:{
            get(){
                return this.$store.state.searchTxt;
            },
            set(value){
                this.$store.dispatch('search',value);
            }
        }
    }
}
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active{
 transition:all 0.3s;
}
.slide-enter,
.slide-leave-to{
    transform:translateY(-2rem);
}
ul{
    border:0;
}
.icon{
    padding:0.5rem;
}
.is-active{
    transition:all 0.3s ease-out;
}
</style>