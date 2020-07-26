<template>
  <div class="bg-gray-100">
     <banner></banner>     
     <about></about>
     <div class="mt-4"></div>
     <statistics></statistics>
     <div class="mt-4"></div>    
     <cloud></cloud>
     <div class="-mt-16 lg:mt-4"></div>
     <codePen></codePen>     
  </div>
</template>

<script>
export default {
  components:{
    banner:()=>import('@/components/Banner.vue'),
    codePen:()=>import('@/components/CodePen.vue'),    
    about:()=>import('@/components/About.vue'),
    statistics:()=>import('@/components/Statistics.vue'),
    cloud:()=> import('@/components/Cloud.vue')
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
