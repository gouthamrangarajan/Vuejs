<template>
  <transition name="fade">
    <div class="bg-gray-900 fixed w-screen h-screen z-20 left-0 top-0" v-show="value">
        <a class="cursor-pointer fixed right-0 mt-1 mr-2 text-orange-700 font-semibold text-3xl" @click="closeModal">
            &times;
        </a>
        <div class="pt-32">
            <transition name="scale">
                <img src="@/assets/my-avatar.jpg" class="object-contain rounded m-auto shadow-2xl" v-show="showImg"> 
            </transition>
        </div>
    </div>
  </transition>
</template>
<script>
export default {
    props:{
        value:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return{
            showImg:false
        }
    },
    created(){
        if(process.client && window)
            window.addEventListener('scroll',this.closeModal)
    },
    destroyed(){
          if(process.client && window)
            window.removeEventListener('scroll',this.closeModal)
    },
    methods:{
        closeModal(){
            this.showImg=false
            setTimeout(()=>{this.$emit('input',false)},300)            
        }
    },
    watch:{
        value(newValue,oldValue){
            if(newValue)
                setTimeout(()=>{this.showImg=true},500)
        }
    }
}
</script>
<style scoped>
.scale-enter-active,
.scale-leave-active{
  transition:all 0.3s;
}
.scale-enter,
.scale-leave-to{
    transform: scale(0);
}
</style>