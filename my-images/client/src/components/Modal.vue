<template>
  <transition name="modal">
    <div class="modal is-active" v-show="open">
        <div class="modal-background" v-show="showBckg"></div>
        <div class="modal-content">
            <p class="image is-4by3" v-if="imageNum>0">
             <img :src="'/imgs/'+imageNum"/>
            </p>
        </div>
        <button class="modal-close is-large" aria-label="close" @click.stop="close"></button>
    </div>
  </transition>
</template>
<script>
export default {
    name:'modal',
    data(){
        return {showBckg:false}
    },
    props:{
      imageNum:{
          type:Number,
          required:true
      },
      open:{
          type:Boolean,
          required:true
      }
    },
    methods:{
        close(){
            this.showBckg=false;
            this.$emit('close');
        }
    },
    watch:{
        open(newVal,oldVal){
            if(newVal==true){
                setTimeout(()=>{
                    this.showBckg=true;
                },500);
            }         
        }
    }
}
</script>
<style scoped>
 .modal-enter-active,
 .modal-leave-active{
     transition:all 0.5s;
 }
 .modal-enter,
 .modal-leave-to{
     transform: scaleY(0) translateX(-50rem);
 }
</style>