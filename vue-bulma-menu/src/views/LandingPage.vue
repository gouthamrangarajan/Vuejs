<template>
<transition name="fade" appear>
    <section :class="['hero is-bold is-fullheight',theme]" v-if="animatePage">
        <div class="hero-body">
            <div class="container has-text-centered">
                <figure class="image">
                    <img src="./../assets/logo.png"/>
                </figure>
                <p class="subtitle">
                    Vue.js, Vuex, Vue Router and Bulma CSS
                </p>
                </div>
        </div>
    </section>
</transition>
</template>
<script>
export default {
    name:'landingPage',
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

figure{
    margin-left:43.5%;
}
img{
    height:10rem;
    width:10rem;
}
</style>

