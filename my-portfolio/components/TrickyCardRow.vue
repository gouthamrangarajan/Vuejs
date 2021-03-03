<template>
      <div :class="{'mt-1 row flex flex-row pb-2':true,'justify-start lg:justify-center':itemsLength<4}" :id="id" @scroll="itemsScrolled"
              @mouseenter="showMarker=true" @click="showMarker=true" @mouseleave="showMarker=false">        
             <slot name="items"></slot>
             <template v-if="itemsLength>4">
                <div :class="['row__marker absolute left-0 cursor-pointer bg-gray-800 text-white flex items-center justify-center opacity-0 rounded w-12',{'lg:opacity-50':showMarker}]" @click="scrollLeft">
                    <a><i class="material-icons">navigate_before</i></a>   
                </div> 
                <div :class="['row__marker absolute right-0 cursor-pointer bg-gray-800 text-white flex items-center justify-center opacity-0 rounded w-12',{'lg:opacity-50':showMarker}]" @click="scrollRight">
                    <a><i class="material-icons">navigate_next</i></a>   
                </div>          
             </template>
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
            counter:0,
            leftClick:false,
            rightClick:false,
            scrollHandled:false,
            scrollDistance:800,
            showMarker:false
        }
    },
    created(){
        if(process.client && window){
            if(window.innerWidth<991)
                this.scrollDistance=400
        }
    },
    methods:{
        scrollRight(){
            let el=document.getElementById(this.id)            
            el.scroll({
                left:this.scrollDistance*(this.counter+1),
                behavior:'smooth'
            })            
            this.rightClick=true
            this.leftClick=false
            this.scrollHandled=false
        },
        scrollLeft(){
            let el=document.getElementById(this.id)         
            el.scroll({
                left:this.scrollDistance*(this.counter-1),
                behavior:'smooth'
            })            
            this.leftClick=true
            this.rightClick=false
            this.scrollHandled=false
        },
        itemsScrolled(){       
            if(!this.scrollHandled){  
                if(this.rightClick)
                {             
                    this.counter++
                    this.rightClick=false                                        
                }
                else{             
                    this.counter--
                    this.leftClick=false                    
                }
                this.scrollHandled=true
            }
        }
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
/* Hide scrollbar for Chrome, Safari and Opera */
.row::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.row {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.row__marker{
    height: 435px; 
    transition:all 0.5s;
}
i{
  font-size:3rem;
}
/* .row::-webkit-scrollbar {
  width: 0.3rem;  
  height: 0.3rem;
}
  
.row::-webkit-scrollbar-thumb {
  background-color:#00bcd4;
  outline: 1px solid transparent;
  border-radius:5px;
}
.row::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} */
</style>