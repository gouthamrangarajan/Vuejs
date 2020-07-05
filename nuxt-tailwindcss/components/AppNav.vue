<template>
   <div class="mb-8">
    <nav class="flex flex-row items-center justify-end p-2 bg-gray-100 fixed w-screen">
        <h3 class="text-xl font-bold text-teal-700 w-1/2">
            Tailwind CSS
        </h3>
        <div class="flex flex-row justify-end w-3/2 mr-2">
            <AppSearch></AppSearch>
            <nuxt-link to="/" class="text-teal-700 hover:text-white font-semibold hover:bg-teal-700 px-4 py-2 rounded">
                Home
            </nuxt-link>           
        </div>
     </nav>
     <div class="clearfix"></div>
    </div>
</template>
<script>
export default {
    components:{
        AppSearch:()=>import('@/components/AppSearch.vue')
    }
}
</script>