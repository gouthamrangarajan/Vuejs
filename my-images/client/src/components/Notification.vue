<template>
    <transition name="slide">      
        <div :class="{'notification':true,'is-success':isSuccess,'is-danger':isSuccess==false}"
            v-show="showNotification">
            <button class="delete" @click="close"></button>
            {{msg}}
        </div>      
    </transition>
</template>
<script>
export default {
    name:'Notification',
    computed:{
        showNotification(){
            return this.$store.state.showNotification;
        },
        msg(){
            return this.$store.state.notificationMsg;
        },
        isSuccess(){
            return this.$store.state.isNotificationSuccess;
        }        
    },
    methods:{
        close(){
            this.$store.dispatch('closeNotification');
        }
    }
}
</script>
<style scoped>
.notification{    
    z-index:200;        
}
.slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
}
.slide-enter,
.slide-leave-to{
    transform: translateY(-20rem);
}
</style>