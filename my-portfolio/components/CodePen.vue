<template>
    <div class="py-2 flex flex-col">
        <div class="px-4 pt-2 flex flex-col items-center mb-1">
            <span class="text-xl text-black">CODEPEN</span>
            <span class="text-gray-600">Recent collection in HTML, CSS & Vue.js</span>           
        </div>
        <div class="codepenitems flex flex-row space-x-1" id="codepenitems" @scroll="itemsScrolled">            
              <a class="scrollmarker cursor-pointer bg-gray-900 text-white absolute text-2xl px-4 pb-2 pt-1
                flex items-center justify-center left-0 mt-64 rounded-full opacity-25 hover:opacity-100 hover:shadow-2xl
                hover:z-10" @click="scrollLeft">
                 &lt;
             </a>
              <a class="scrollmarker cursor-pointer bg-gray-900 text-white absolute text-2xl px-4 pb-2 pt-1
                flex items-center justify-center right-0 mt-64 rounded-full opacity-25 hover:opacity-100 hover:shadow-2xl
                hover:z-10" @click="scrollRight">
                 &gt;
             </a>
            <div class="iframecontainer" v-for="item in collection" :key="item.id" 
                 :id="'item_'+item.id">
                <iframecard v-bind="item"> </iframecard>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            collection:[],
            counter:0,
            leftClick:false,
            rightClick:false,
            scrollHandled:false,
            scrollDistance:1000
        }
    },
    created(){
        let data=require('@/static/data.json')        
        data.info.codePen.forEach(el=>{
            let id=Math.random().toString(16).slice(8)
            this.collection.push({id,url:el.url})            
         })
        if(process.client && window){
            if(window.innerWidth<991)
                this.scrollDistance=600
        }
    },
    components:{
        iframecard:()=>import('@/components/IFrameCard')
    },
    methods:{
        scrollRight(){
            let el=document.getElementById('codepenitems')            
            el.scroll({
                left:this.scrollDistance*(this.counter+1),
                behavior:'smooth'
            })            
            this.rightClick=true
            this.leftClick=false
            this.scrollHandled=false
        },
        scrollLeft(){
            let el=document.getElementById('codepenitems')         
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
 .codepenitems {
    width:98.5vw;
    overflow:hidden;
}
.scrollmarker {
    transition:all 0.3s;
}
</style>