<template>
      <div :class="{'mt-1 row flex flex-row space-x-1':true,'items-center justify-center':itemsLength==1}" :id="id" @scroll="itemsScrolled">   
            <transition name="fade">         
                <a class="scrollmarker cursor-pointer bg-gray-700 hover:bg-gray-900 text-white absolute text-2xl px-4 pb-2 pt-1
                    flex items-center justify-center left-0 mt-48 rounded-full z-10 hover:shadow-2xl" 
                    @click="scrollLeft" v-show="counter!=0" v-if="itemsLength>1">  
                    &lt;
                </a>
            </transition>
            <transition name="fade"> 
                <a class="scrollmarker cursor-pointer bg-gray-700 hover:bg-gray-900 text-white absolute text-2xl px-4 pb-2 pt-1
                    flex items-center justify-center right-0 mt-48 rounded-full z-10 hover:shadow-2xl"
                     @click="scrollRight" v-if="itemsLength>1">
                    &gt;
                </a>
            </transition> 
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
             counter:0,
            leftClick:false,
            rightClick:false,
            scrollHandled:false,
            scrollDistance:1000
        }
    },
    created(){
        if(process.client && window){
            if(window.innerWidth<991)
                this.scrollDistance=600
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
    overflow:hidden;
    min-height: 450px;
}
.scrollmarker {
    transition:all 0.3s;
}
</style>