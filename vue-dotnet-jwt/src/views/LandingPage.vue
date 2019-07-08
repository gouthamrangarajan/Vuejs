<template>
<transition name="fade" appear>
    <section class="hero is-bold is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <figure class="image">
                    <img src="./../assets/logo.png"/>
                </figure>
                <p class="subtitle">
                    Vue.js, Vuex, Vue Router and JWT authentication using .Net core
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
        
    },
    watch:{
     
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

