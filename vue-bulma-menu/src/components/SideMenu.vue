<template>
      <aside class="menu">
     <transition-group name="slide" class="menu-list" tag="ul">     
   <router-link v-for="item in menuList"  :to="item.url" tag="li" 
       :key="item.id" v-show="item.display">       
            <a>{{item.name}}</a>         
       </router-link>         
  </transition-group>
  </aside>   
</template>
<script>
export default {
    name:'sideMenu',
    data(){
        return {
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
            this.menuList.forEach((el,ind)=>{
                setTimeout(()=>{
                    el.display=newVal;
                },ind*100);
            });           
        }
    },
    mounted(){
        this.menuList.forEach((el,ind)=>{
                    setTimeout(()=>{
                        el.display=this.menuShow;
                    },ind*100);
                });   
    }
}
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active{
  transition:all 0.5s;
}

.slide-enter,
.slide-leave-to{
  transform:translateY(-100rem);
}
.router-link-exact-active a{
    background-color: #3273dc;
    color:#fff;
}
</style>

