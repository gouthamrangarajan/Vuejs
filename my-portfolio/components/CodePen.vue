<template>
    <div class="py-2 flex flex-col">
        <div class="px-4 pt-2 flex flex-col items-center mb-1">
            <span class="text-xl text-black">CODEPEN</span>
            <span class="text-gray-600">Recent collection in HTML, CSS & Vue.js</span>           
        </div>
        <scrollableRow id="codepenitems" :itemsLength="collection.length">
            <template v-slot:items>
                <div class="iframecontainer" v-for="item in collection" :key="item.id" 
                    :id="'item_'+item.id">
                    <codePenCard v-bind="item"> </codePenCard>
                </div>
            </template>
        </scrollableRow>
    </div>
</template>
<script>
export default {
    data(){
        return {
            collection:[],
            iFrameWidth:600           
        }
    },
    created(){
        let data=require('@/static/data.json')        
        data.info.codePen.forEach(el=>{
            let id=Math.random().toString(16).slice(8)
            this.collection.push({id,url:el.url,imgSrc:el.imgSrc})            
         })        
         if(process.client && window){
            if(window.innerWidth<991)
                this.iFrameWidth=415
        }
    },
    components:{
        // iframecard:()=>import('@/components/IFrameCard'),
        codePenCard:()=>import('@/components/CodePenCard'),
        scrollableRow:()=>import('@/components/ScrollableRow')
    },
    methods:{
        
    }
}
</script>

<style scoped>

</style>