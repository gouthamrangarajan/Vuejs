<template>
    <div>
        <nav class="transparent">
            <div class="nav-wrapper">
                <a :class="'brand-logo '+logoColor">Logo</a>
                <ul class="right hide-on-med-and-down">               
                    <li v-for="item in menu" :key="item.id" :class="{'active':item.active}">
                        <router-link :to="item.path"><i class="material-icons black-text">{{item.icon}}</i></router-link>
                    </li>
                </ul>
                <form class="right hide-on-med-and-down">
                    <div class="input-field  z-depth-1">
                        <input id="search" type="search" class="validate" v-model="srchTxt">
                        <label class="label-icon" for="search"><i class="material-icons black-text">search</i></label>
                        <i class="material-icons" @click="srchTxt='';showSrchResults=false">close</i>                       
                    </div>
                </form>          
            </div>
        </nav>             
        <transition-group name="records" tag="ul" :class="'collection '+theme" v-show="showSrchResults">
            <li v-for="item in searchableMenus" :key="item.id" :class="'collection-item white-text '+theme">
                <router-link class="white-text" :to="item.path">{{item.text}}</router-link>
            </li>
        </transition-group>        
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    name:'NavBar',
    data(){
       return {menu:[
           {id:1,icon:'dashboard',path:'/',active:true},
           {id:2,icon:'person',path:'/form',active:false},
           {id:3,icon:'notifications',path:'/notifications',active:false},
       ],
       searchableMenus:[
           {id:1,text:'Dashboard',path:'/',active:true},
           {id:2,text:'Form',path:'/form',active:false},
           {id:3,text:'Notifications',path:'/notifications',active:false},
           {id:4,text:'About',path:'/about',active:false}],
       srchTxt:'',
       showSrchResults:false}
    },
    computed:{
        ...mapState(['theme']),
        logoColor(){
            return this.theme.replace(/\s/g, '-text ').replace("darken-1","darken-4") 
        }
    },
    watch:{
        $route:{
            immediate:true,
            handler(newVal){
                this.menu.forEach(el=>el.active=false)
                let fl=this.menu.filter(el=>el.path==newVal.path)[0]
                if(fl)
                    fl.active=true
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
    margin-top:-0.6rem;
}
.brand-logo{
    margin-left:0.8rem;
}
.collection{
    position: absolute;
    z-index:3;
    right:0;
    margin-right:12rem;
    width:20rem;
    margin-top:-0.2rem;
}
li{
    cursor: pointer;
}
.records-move{
    transition:all 0.3s;
}
.records-enter-active{
    transition:all 0.3s;
}
.records-enter{
    transform:translateX(2px);
    opacity: 0;
}
</style>