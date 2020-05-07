<template>
 <transition name="fade" appear>
    <div class="settings  right-align" @click.stop>
        <a :class="'btn waves-effect waves-light hoverable '+settingsBtnColor" @click="showSetting=!showSetting">
            <transition name="rotate1" appear>
                <i class="material-icons" v-show="showSetting" :key="1">settings</i>
            </transition>
             <transition name="rotate2" appear>
                <i class="material-icons" v-show="!showSetting" :key="2">settings</i>
            </transition>
        </a>
        <transition name="scale">
            <div class="card" v-show="showSetting">
                <div class="card-content">
                    <span class="card-title left">
                        Theme:
                    </span>
                    <div class="colors-container clearfix">
                        <div v-for="(clr,ind) in availableColors" :key="ind" 
                          @click="setTheme(clr)"
                          :class="['left z-depth-1 hoverable',clr,theme==clr?'active':'']">

                        </div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
            </div>
        </transition>
    </div>
 </transition>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    name:'Settings',
    data(){
        return {
            showSetting:false,
            availableColors:['teal darken-1','cyan darken-1','blue darken-1','indigo darken-1']

        }
    },
    computed:{
        ...mapState(['theme']), 
        settingsBtnColor(){
            return this.theme.replace("darken-1","darken-4")
        }       
    },
    created(){
        window.addEventListener('click',this.closeSetting)
    },
    destroyed(){
        window.removeEventListener('click',this.closeSetting)
    },
    methods:{
        ...mapActions(['setTheme']),
        closeSetting(){
            this.showSetting=false;
        }
    }
}
</script>
<style scoped>
.settings{
    position: fixed;
    margin-top:12rem;
    right: 0rem;
    z-index: 3;
}
.settings .btn{
    opacity: 0.7;
    transition:all 0.3s;
}
.settings .btn:hover{
    opacity: 1;
    transition:all 0.3s;
}
.scale-enter-active,
.scale-leave-active{
    transition:all 0.3s;
}
.scale-enter,
.scale-leave-to{
    opacity:0;
    transform:translateY(-2rem);
}
.rotate1-enter-active,
.rotate2-enter-active{
    transition: all 0.3s;
}
.rotate1-enter{
    transform: rotate(90deg);
}

.rotate2-enter{
    transform: rotate(-90deg);
}
.colors-container > div{
    width:3.5rem;
    height: 6rem;
    margin-left:0.3rem;
    cursor: pointer;
    border-radius: 10px;
    transition:all 0.3s;
}
.colors-container > div.active{
    border:2px dotted #ff8a65;      
    transform: scale(1.1);
    transition:all 0.3s;
}
</style>