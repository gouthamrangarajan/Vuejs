<template>
  <transition name="modal">
    <div class="modal is-active" v-show="open">
        <div class="modal-background" v-show="showBckg"></div>
        <div class="modal-content">
            <p class="image" v-if="imageInd>0">
             <img :src="'/imgs/'+imgId"/>
            </p>
        </div>
        <transition name="fade">
            <button class="modal-close is-large" aria-label="close" @click.stop="close" v-show="showBckg"></button>
        </transition>
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
      imageInd:{
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
    },
    computed:{
         imgId(){
              var dt= this.$store.state.imgModified.filter((el,ind)=>{
                if(ind+1==this.imageInd){
                    return true;
                }
            })[0];    
            if(dt)       
            {                
              return parseInt(dt.fileId);
            }
            else
             return -1;
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
     transform: scale(0) skewX(60deg);
 }
 .modal{
     z-index: 103;
 }
</style>