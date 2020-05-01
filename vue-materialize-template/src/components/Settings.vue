<template>
 <transition name="fade" appear>
    <div class="settings  right-align" @click.stop>
        <a class="btn indigo darken-4 waves-effect waves-light" @click="showSetting=!showSetting">
            <transition name="rotate1" appear>
                <i class="material-icons" v-show="showSetting" :key="1">settings</i>
            </transition>
             <transition name="rotate2" appear>
                <i class="material-icons" v-show="!showSetting" :key="2">settings</i>
            </transition>
        </a>
        <transition name="scale">
            <div class="card small" v-show="showSetting">
                <div class="card-content">
                    <span class="card-title blue-text">
                        Some Settings...
                    </span>
                </div>
            </div>
        </transition>
    </div>
 </transition>
</template>
<script>
export default {
    name:'Settings',
    data(){
        return {
            showSetting:false
        }
    },
    created(){
        window.addEventListener('click',this.closeSetting)
    },
    destroyed(){
        window.removeEventListener('click',this.closeSetting)
    },
    methods:{
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
    z-index: 1;
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
</style>