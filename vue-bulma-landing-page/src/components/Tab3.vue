<template>
<baseTab>
  <template v-slot:content>
     <h1 class="title">Tab 3</h1>
      <h2 class="subtitle">
         Tab 3 content goes here......
      </h2>
  </template>
</baseTab>
</template>

<script>
import baseTab from './BaseTab'
export default {
 name:'Tab3',
 components:{
   baseTab
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
