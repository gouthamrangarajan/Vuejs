<template>
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Are you sure?</h4>
      <p>Once deleted the data cannot be retrived</p>
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat" @click="$emit('input',false);successFn()">Yes</a>
      <a class="modal-close waves-effect waves-green btn-flat" @click="$emit('input',false)">No</a>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    value:{
      type:Boolean,
      required:true
    },
    successFn:{
      type:Function,
      required:true
    }
  },
  mounted(){
    if(process.client){
       let elems = document.querySelectorAll('.modal')
       let instances = M.Modal.init(elems, {})
    }
  },
  watch:{
    value(newVal,oldVal){
      if(newVal){
        let elem = document.getElementById('modal1')
        let instance=M.Modal.getInstance(elem)
        instance.open()
      }
    }
  }
}
</script>
<style scoped>
@media only screen and (min-width: 992px){
  .modal{
      width: 40%;
    }
}
</style>
