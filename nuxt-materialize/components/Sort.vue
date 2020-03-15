<template>
   <transition :name="'rotate-'+order" mode="out-in">
      <i class="material-icons tiny black-text" v-if="order=='asc'" :key="1">arrow_upward</i>
      <i class="material-icons tiny black-text" v-else :key="2"> arrow_downward</i>
  </transition>
</template>
<script>
export default {
  props:{
    order:{
      type:String,
      required:true,
      default:'asc',
      validator: function (value) {
        return ['asc', 'desc'].indexOf(value) !== -1
      }
    }
  }
}
</script>
<style scoped>
.rotate-asc-enter-active{
  transition:all 0.3s
}
.rotate-asc-enter,
.rotate-asc-leave-to{
  opacity:0;
  transform:rotate(180deg);
}

.rotate-desc-enter-active{
  transition:all 0.3s;
}

.rotate-desc-enter,
.rotate-desc-leave-to{
  opacity:0;
  transform:rotate(-180deg);
}
</style>
