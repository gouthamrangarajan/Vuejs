<template>
    <table class="z-depth-5 hoverable striped">
          <thead>
            <tr class="light-blue accent-4 white-text">
              <th class="center" style="width:40%">Name</th>
              <th class="center" style="width:60%">Email</th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="records">
            <tr v-for="usr in users" :key="usr.email">
               <td class="center">
                 {{usr.name}}
               </td>
               <td class="center">
                 {{usr.email}}
               </td>
            </tr>
          </transition-group>
      </table>
</template>
<script>
export default {
 created(){
   if(process.client)
    this.$store.dispatch('refreshUsers')
 },
 computed:{
   users(){
     return this.$store.getters.srchedUsers
   }
 }
}
</script>
<style scoped>
.records-move{
  transition:all 0.3s;
}
.records-enter-active{
  transition:all 0.3s;
}
.records-enter,.records-leave-to{
  opacity: 0;
  transform: translateX(2px);
}
</style>
