<template>
    <div class="h-56 w-56 bg-white flex flex-col rounded border border-gray-300 shadow p-1 
                cursor-pointer">
        <div class="h-48 w-full overflow-hidden">
            <img class="object-cover w-full h-full" :src="imgUrl" v-if="fileType=='img' && imgUrl!=''">
            <pre v-else-if="fileType=='txt'" class="text-xs p-1">{{txt}}</pre>
            <div class="h-full items-center flex space-x-2 justify-center" v-else>
                <img class="w-32 h-32 rounded" src="@/assets/pdf.png" v-if="fileType=='pdf'">      
                <img class="w-32 h-32 rounded" src="@/assets/ppt.png" v-else-if="fileType=='ppt'"> 
                <img class="w-32 h-32 rounded" src="@/assets/word.png" v-else-if="fileType=='doc'">      
                <img class="w-32 h-32 rounded" src="@/assets/msexcel.png" v-else-if="fileType=='excel'">            
                <div class="h-2 w-2 bg-gray-300 rounded-full" v-else v-for="num in 3" :key="num"></div>
            </div>
        </div>
        <div class="w-full py-1 px-3 flex space-x-3 items-center">
            <i class="material-icons text-green-600 mt-1" v-if="fileType=='img'">image</i>
            <i class="material-icons text-green-600 mt-1" v-else-if="fileType=='txt'">insert_drive_file</i>
            <span class="text-gray-600 overflow-hidden h-6 w-48">{{name}}</span>
        </div>
    </div>
</template>

<script>
import {ref, watch} from 'vue';
import {getFileType} from '@/composables/getFileType'
import {readFile} from '@/composables/readFile'
export default { 
    setup({file}){
        const {name,type}=file;   
        let fileType=getFileType(file);
        const imgUrl=ref('');
        const txt=ref('');
        const res=readFile(file)
        watch(res,()=>{
            if(fileType=='img'){                        
              imgUrl.value=res.value;
            }
            else if(fileType=='txt'){
              txt.value=res.value
            }
        })       
        return {name,imgUrl,txt,fileType};
    },
    props:{
        file:{
            type:File,
            required:true
        }
    }
}
</script>

<style scoped>

</style>