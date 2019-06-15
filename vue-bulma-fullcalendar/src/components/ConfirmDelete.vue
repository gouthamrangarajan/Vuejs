<template>
    <div class="modal is-active" v-show="showModal">
  <div class="modal-background"></div>
  <transition name="scale">
 <div class="modal-card" v-show="animateModal">
    <header class="modal-card-head">
      <p class="modal-card-title">Wait...</p>
      <button class="delete" aria-label="close" @click="animateModal=false"></button>
    </header>
    <section class="modal-card-body">
      <p class="is-size-4">
        Are you sure ?
      </p>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="sendConfirm">Yes</button>
      <button class="button is-dark" @click="animateModal=false">No</button>
    </footer>
  </div>  
  </transition>
</div>
</template>
<script>
export default {
    name:'confirmDelete',
     props: {
      showModal:{
        type:Boolean,
        required:true
      },      
     },
    data(){
      return {animateModal:false}
    },  
   watch:{
    showModal(newVal,oldVal){
      if(newVal==true){
        this.$nextTick(()=>{
           this.animateModal=newVal;
        });
      }
    },
    animateModal(newVal,oldVal){
      if(newVal==false){
        setTimeout(()=>{
          this.$emit('closeModal');
        },500);
      }
    }
  },
  methods:{
    sendConfirm(){
      this.$emit('confirm');
      this.animateModal=false;
    }
  }
}
</script>
