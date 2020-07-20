<template>   
  <nav class="flex items-center  bg-gray-100 w-screen sticky top-0 p-4 pl-32 space-x-4">
    <h3 class="text-3xl font-bold text-teal-700">
        Tailwind CSS
    </h3>
    <div class="flex items-center flex-1 justify-end">
        <AppSearch></AppSearch>
        <nuxt-link to="/" class="text-blue-700 hover:text-white font-semibold hover:bg-blue-700 px-4 py-2 rounded mr-2">
            Home
        </nuxt-link>           
    </div>
   </nav>   
</template>
<script>
export default {
    components:{
        AppSearch:()=>import('@/components/AppSearch.vue')
    }
}
</script>