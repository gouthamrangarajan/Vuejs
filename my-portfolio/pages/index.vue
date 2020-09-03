<template>
  <div class="bg-gray-100">
     <banner></banner>     
     <about></about>
     <div class="mt-2"></div>
     <statistics></statistics>
     <div class="mt-2"></div>    
     <cloud></cloud>
     <div class="mt-2"></div>
     <gitHubItems></gitHubItems>     
     <div class="mt-2"></div>
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
    cloud:()=> import('@/components/Cloud.vue'),
    gitHubItems:()=>import('@/components/GithubItems.vue')
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
