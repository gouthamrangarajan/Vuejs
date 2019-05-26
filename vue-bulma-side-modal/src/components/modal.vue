<template>
   <div class="is-modal"
       v-show="showModal">
    <div class="modal-background"></div>
    <transition name="modal">
    <div class="modal-card is-pulled-right" v-show="animateModal">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"
             @click="animateModal=false"></button>
    </header>
    <section class="modal-card-body">
      <article class="message is-primary">
  <div class="message-header">
    <p>Primary</p>   
  </div>
  <div class="message-body">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
  </div>
</article>

<article class="message is-link">
  <div class="message-header">
    <p>Link</p>    
  </div>
  <div class="message-body">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
  </div>
</article>

<article class="message is-info">
  <div class="message-header">
    <p>Info</p>    
  </div>
  <div class="message-body">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
  </div>
</article>
<article class="message is-success">
  <div class="message-header">
    <p>Success</p>    
  </div>
  <div class="message-body">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
  </div>
</article>
    </section>
    <footer class="modal-card-foot">     
      <button class="button"  @click="animateModal=false">Close</button>
    </footer>
  </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    showModal:{
      type:Boolean,
      required:true
    }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-modal{
  position:fixed;
  height:100%;
  width:100%;
  z-index:200;
}
.modal-card{
   min-height:100vh;
}

.modal-enter-active,
.modal-leave-active{
  transition:all 0.5s;
}

.modal-enter,
.modal-leave-to{
  transform:translateX(50rem);
}
</style>
