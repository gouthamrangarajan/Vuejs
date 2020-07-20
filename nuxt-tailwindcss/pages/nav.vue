<template>
    <div class="bg-white py-6 px-8 rounded w-11/12 m-auto">
        <div class="text-2xl text-red-700 mb-4">        
            <span> Sample Navs</span>
        </div>
        <NavComp></NavComp>
        <div class="mt-24"></div>
        <NavComp bg-color="bg-blue-700"></NavComp>
        <div class="mt-24"></div>
        <NavComp bg-color="bg-red-700"></NavComp>
        <div class="mt-24"></div>
        <NavComp bg-color="bg-gray-700"></NavComp>
        <div class="mt-24"></div>
        <NavComp bg-color="bg-green-700"></NavComp>
        <div class="mt-24"></div>
        <NavComp bg-color="bg-purple-700"></NavComp>
        <div class="mt-24"></div>
        <NavComp bg-color="bg-pink-700"></NavComp>        
        <div class="mb-24"></div>        
    </div>
</template>
<script>
export default {
    components:{
        NavComp:()=>import('@/components/NavComp.vue')
    }
}
</script>
<style scoped>

</style>