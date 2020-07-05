<template>
  <div class="flex flex-col items-center lg:grid lg:grid-cols-2 lg:gap-8 lg:mt-8">       
    <img src=".././assets/bck1.png" class="rounded shadow-md">
    <AppSlider>         
    </AppSlider>
    <div class="flex items-center justify-center mt-2 lg:mt-0 lg:col-span-2 h-56 ">
      <div class="py-4 px-8">
          <span class="text-orange-700 text-lg font-semibold">About</span>
          <p class="text-base py-4">
            Components build using Nuxt,Vue & Tailwind CSS 
          </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {  
  components:{
    AppSlider:()=>import('@/components/AppSlider.vue')
  },
  methods:{
   
  },
   
}
</script>
<style scoped> 

</style>
