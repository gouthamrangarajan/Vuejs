<template>
<div>
  <div class="right">
    <nuxt-link to="/register"
     class="btn-floating btn-large red pulse waves-effect waves-light modal-trigger tooltipped"
      data-position="left" data-tooltip="Add a user"
        href="#register-modal">
      <i class="large material-icons">add</i>
    </nuxt-link>
  </div>
</div>
</template>
<script>
export default {
  mounted(){
    if(process.client){
     let elems = document.querySelectorAll('.tooltipped')
      let instances = M.Tooltip.init(elems, {});
    }
  }
}
</script>
<style scoped>

</style>
