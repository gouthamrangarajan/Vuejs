<template>
    <div class="left side-nav-container" :style="navContainerStyle">
        <ul :class="navClass" :style="navStyle" id="appSideNav">
            <li :key="-1">
                <div class="user-view">
                    <i class="large material-icons white-text">person</i>
                    <a class="white-text">Welcome</a>
                </div>
            </li>
            <li v-for="item in menu" :key="item.id" :class="[item.active?navLiActiveClass:'']">
                <router-link class="white-text waves-effect waves-light" :to="item.path">{{item.text}}</router-link>
            </li>        
        </ul>
        <a class="sidenav-trigger right btn-floating white waves-effect waves-green" @click="toggleWidth"
            data-target="appSideNav">
            <i class="material-icons  grey-text text-darken-1">more_vert</i>
        </a>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'SideNav',
    props:{
        value:{
            type:Number,
            required:true
        }
    },
    data(){
       return {navContainerWidth:20,navWidth:18,
            initialValue:20,
            isMobile:false,
            menu:[
           {id:1,text:'Dashboard',path:'/',active:true},
           {id:2,text:'Menu1',path:'/menu1',active:false},
           {id:3,text:'Menu2',path:'/menu2',active:true}
       ]}
    },
    mounted(){
        this.initialValue=this.value
        this.navWidth=this.value-2  
        if(window.innerWidth<1024){
            this.isMobile=true
            let  elem = document.getElementById('appSideNav');
            let instance = M.Sidenav.init(elem, {});
        }
    },
    computed:{
        ...mapState(['theme']),
        navClass(){
          let cl="sidenav "+this.theme
          if(!this.isMobile){
              cl+=" sidenav-fixed"
          }
          return cl
        },
        navLiActiveClass(){
           return this.theme.replace(" darken-1","")+ " darken-4" 
        },
        navContainerStyle(){
            return {width:this.navContainerWidth+'rem'}
        },
        navStyle(){
            let offset=this.navContainerWidth-(this.navWidth+2)
            return {width:this.navWidth+'rem',transform:'translateX('+offset+'rem)'}
        }
    },
    methods:{      
        toggleWidth(){
            if(!this.isMobile){
                let top=this.initialValue-1
                let val=0
                if(this.navContainerWidth==this.initialValue){                
                    val=-1                    
                }
                else if(this.navContainerWidth==2){                    
                    val=1
                }
                if(val!=0){
                    for(let i=1;i<top;i++){
                        setTimeout(()=>{                        
                            this.$emit('input',this.navContainerWidth+val)
                        },15*i)
                    }
                }
            }
        }
    },
    watch:{
        $route:{
            immediate:true,
            handler(newVal){
                this.menu.forEach(el=>el.active=false)
                this.menu.filter(el=>el.path==newVal.path)[0].active=true
            }
        },
        value:{
            immediate:true,
            handler(newVal,oldVal){
                this.navContainerWidth=newVal                
            }
        }
    }
}
</script>
<style scoped>
    a{
        cursor: pointer;
    }       
    .user-view{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;        
    }
  
    .btn-floating{
        margin-top:0.5rem;
    }
</style>