<template>
      <div :class="{'mt-1 row flex flex-row pb-2':true,'justify-center':itemsLength<4}" :id="id">        
             <slot name="items"></slot>
      </div>
</template>
<script>
export default {
    props:{
        id:{
            type:String,
            required:true
        },
        itemsLength:{
            type:Number,
            required:false,
            default:1
        }
    },
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
    }    
}
</script>
<style scoped>
 .row {
    width:98.5vw;
    overflow:auto;
    min-height: 450px;
    scroll-behavior: smooth;
}
.row::-webkit-scrollbar {
  width: 0.3rem;  
  height: 0.3rem;
}
  
.row::-webkit-scrollbar-thumb {
  background-color:#00bcd4;
  outline: 1px solid #00bcd4;
  border-radius:5px;
}
.row::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>