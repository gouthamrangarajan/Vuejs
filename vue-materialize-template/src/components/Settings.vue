<template>
 <transition name="fade" appear>
    <div class="settings right-align">
        <a class="btn blue waves-effect waves-light" @click="showSetting=!showSetting"><i class="material-icons">settings</i></a>
        <transition name="scale">
            <div class="card small" v-show="showSetting">
                <div class="card-content">
                    <div class="card-title blue-text">
                        Some Settings...
                    </div>
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
    opacity: 0.6;
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
</style>