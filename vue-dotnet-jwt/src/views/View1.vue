<template>
<transition name="slide" appear>
    <section class="hero is-bold is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">               
                <p class="title">
                   View1
                </p>
            </div>
        </div>
    </section>
</transition>
</template>
<script>
export default {
    name:'View1',
    data(){
        return {}
    },
    computed:{
       
    },
    watch:{
       
    },
}
</script>
<style scoped>
.slide-enter-active,.slide-leave-active{
    transition:all 0.5s;
}
.slide-enter,.slide-leave-to{
    transform: translateX(100rem) translateY(100rem);
}

</style>

