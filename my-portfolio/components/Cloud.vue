<template>
    <div class="flex justify-center">
        <div class="cloud flex flex-col justify-center bg-white py-4 px-6 rounded shadow">
            <span class="text-xl text-orange-700">Cloud Hostings:</span>
            <div v-for="cloud in category" :key="cloud.id">
                <div class="p-2">
                    <span class="text-lg text-yellow-700 uppercase"> {{cloud.name}}</span>
                    <div class="px-4">
                        <div v-for="(item,index) in cloud.collection" :key="index">
                            <template v-if="item.url">
                                <a class="cursor-pointer underline text-blue-700" @click="launch(item.url)">{{item.url}}</a>
                                <p class="px-8">{{item.description}}</p>
                            </template>
                            <template v-if="item.other">
                                <div v-for="(otherItem,otherindex) in item.other" :key="otherindex">
                                <a class="cursor-pointer underline text-blue-700" @click="launch(otherItem.url)">{{otherItem.url}}</a>  
                                </div>    
                            </template>
                        </div>                     
                    </div>
                </div>
            </div>        
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {category:[]}
    },
    created(){
        let data=require('@/static/data.json')        
        Object.keys(data.info.cloud).sort((a,b)=>{
            if(a=="firebase")
                return -1
            else if(b=="firebase")
                return 1
            else if(a=="netlify")
                return -1
            else if(b=="netlify")
                return 1
            else if(a=="aws")
                return -1
            else if(b=="aws")
                return 1
            else
                return 0    
        }).forEach(el=>{
            let id=Math.random().toString(16).slice(8)
            let collection=data.info.cloud[el]
            this.category.push({id,name:el,collection})     
        })
    },
    methods:{
        launch(url){
            window.open(url)
        }
    }
}
</script>
<style scoped>
@media only screen and (min-width:992px) {
    .cloud{
        max-width: 63rem;
    }
}
</style>