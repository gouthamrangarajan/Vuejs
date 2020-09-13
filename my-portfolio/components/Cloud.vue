<template>
   <div>
     <div class="py-2 flex flex-col">
        <div class="px-4 pt-2 flex flex-col items-center">
            <span class="text-xl text-orange-700">Cloud Projects</span>
            <div v-for="cloud in category" :key="cloud.id"  class="flex flex-col items-center mt-1">
                <span class="text-xl text-yellow-700 uppercase"> {{cloud.name}}</span>
                <trickyCardRow :id="cloud.name+'items'" :itemsLength="getProject(cloud.collection).length">
                    <template v-slot:items>                        
                            <trickyProjectCard  v-for="(item,index) in getProject(cloud.collection)" :key="index"
                                :project="item" :occupyFull="getProject(cloud.collection).length==1">

                            </trickyProjectCard>                            
                    </template>  
                </trickyCardRow>
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
    components:{
        // scrollableRow:()=>import('@/components/ScrollableRow.vue'),        
        // cloudProjectCard:()=>import('@/components/ProjectCard.vue'),
        trickyCardRow:()=>import('@/components/TrickyCardRow.vue'),
        trickyProjectCard:()=>import('@/components/TrickyProjectCard.vue'),
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
       getProject(data){
           let retData=
            data.filter(el=>{ 
               if(el.url)
                return true
               else
                 return false
            }).map(el=>el)
          
         let others= data.filter(el=>{
            if(el.other)
                return true
            else
                return false
          })

          if(others.length==1)
            others[0].other.forEach(el=>retData.push(el))

          return retData.sort((a,b)=>{
              if(a.order>b.order)
                return 1
              else if(a.order<b.order)
                return -1
              else
                return 0
          });
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