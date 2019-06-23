<template>
<transition name="scale" appear>
     <section :class="['hero is-bold is-fullheight',theme]" v-if="animatePage">
        <div class="hero-body">
            <div class="container has-text-centered">               
                <p class="title">
                   View2
                </p>
            </div>
        </div>
    </section>
</transition>
</template>
<script>
export default {
    name:'View2',
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
.scale-enter-active,.scale-leave-active{
    transition: all 0.5s;
}
.scale-enter,.scale-leave-to{
    transform: scale(0);
}

</style>
