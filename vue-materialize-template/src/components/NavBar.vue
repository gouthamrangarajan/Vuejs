<template>
      <nav class="transparent">
        <div class="nav-wrapper">
            <a class="brand-logo cyan-text text-darken-1">Logo</a>
              <ul class="right hide-on-med-and-down">               
                <li v-for="item in menu" :key="item.id" :class="{'active':item.active}">
                    <router-link :to="item.path"><i class="material-icons black-text">{{item.icon}}</i></router-link>
                </li>
            </ul>
             <form class="right hide-on-med-and-down">
                <div class="input-field  z-depth-1">
                    <input id="search" type="search" class="validate">
                    <label class="label-icon" for="search"><i class="material-icons black-text">search</i></label>
                    <i class="material-icons">close</i>
                </div>
            </form>          
        </div>
    </nav>
</template>
<script>
export default {
    name:'NavBar',
    data(){
       return {menu:[
           {id:1,icon:'dashboard',path:'/',active:true},
           {id:2,icon:'notifications',path:'/menu1',active:false},
           {id:3,icon:'person',path:'/menu2',active:false}
       ]}
    },
    watch:{
        $route:{
            immediate:true,
            handler(newVal){
                this.menu.forEach(el=>el.active=false)
                this.menu.filter(el=>el.path==newVal.path)[0].active=true
            }
        }
    }
}
</script>
<style scoped>
nav{
    box-shadow: none;
}
form{
    height: 2.8rem;
    line-height: 2.8rem;
    margin-top:1rem;
    margin-right: 0.5rem;
    width:20rem;
}
form i{
    margin-top:-0.5rem;
}
</style>