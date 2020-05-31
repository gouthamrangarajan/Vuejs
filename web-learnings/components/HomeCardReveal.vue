<template>
  <transition-group name="fade" class="card-reveal" tag="div">
      <span class="card-title teal-text text-darken-2" :key="-1">{{title}}<i class="material-icons right grey-text text-darken-4">close</i></span>
      <p class="sub-title grey-text" :key="-2">Tags</p>
      <div v-for="(tag,index) in tags" :key="id+'_'+index"
        class="chip light-blue darken-2 white-text">
        {{tag}}
      </div>
  </transition-group>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  props:{
    tags:{
      type:Array,
      required:true
    },
    id:{
      type:String,
      required:true
    },
    title:{
      type:String,
      required:true
    }
  },


}
</script>
<style scoped>

</style>
