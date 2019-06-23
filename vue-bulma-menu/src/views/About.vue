<template>
<transition name="slide" appear>
    <section :class="['hero is-bold is-fullheight',theme]" v-if="animatePage">
        <div class="hero-body">
            <div class="container has-text-centered">               
                <p class="title">
                   About
                </p>
            </div>
        </div>
    </section>
</transition>
</template>
<script>
export default {
    name:'About',
     data(){
        return {animatePage:true}
    },
    computed:{
        theme(){
            return this.$store.state.theme;
        }
    },
    watch:{
        theme(newVal,oldVal){            
            this.animatePage=false;
            this.$nextTick(()=>{
                this.animatePage=true;               
            });
        }
    },
}
</script>
<style scoped>
.slide-enter-active,.slide-leave-active{
    transition:all 0.5s;
}
.slide-enter,.slide-leave-to{
    transform: translateX(100rem);
}

</style>
