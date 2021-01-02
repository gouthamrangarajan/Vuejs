<template>
    <div class="w-24 lg:w-48 sideNav">
        <div class="flex flex-col space-y-3">
            <div class="py-2 px-3 lg:px-4">
                <a class="btn rounded lg:rounded-full flex flex-col lg:flex-row items-center justify-between w-24 lg:w-40 cursor-pointer bg-white
                        shadow py-1 px-3 text-red-500 hover:text-red-700" 
                    @click="$refs.files.click">
                    <i class="material-icons">upload</i>
                    <span>Upload file(s)</span>
                </a>
            </div>
            <ul class="flex flex-col space-y-2 cursor-pointer break-all">
                <li :class="['py-1 px-3 bg-white hover:bg-gray-100 rounded-r-full btn text-gray-700 hover:text-blue-700 flex space-x-2 items-center pl-5',
                            {'bg-blue-100 text-blue-600':currMenu=='img'}]"  @click.stop="$emit('setMenu','img')">
                     <i class="h-6 w-6 rounded-full material-icons">image</i>
                     <a class="invisible lg:visible">Images</a>
                </li>
                <li :class="['py-1 px-3 bg-white hover:bg-gray-100 rounded-r-full btn text-gray-700 hover:text-blue-700 flex space-x-2 items-center pl-5',
                            {'bg-blue-100 text-blue-600':currMenu=='txt'}]" @click.stop="$emit('setMenu','txt')">
                     <i class="h-6 w-6 rounded-full material-icons">insert_drive_file</i>
                     <a class="invisible lg:visible">Text Files</a>
                </li>
                <li :class="['py-1 px-3 bg-white hover:bg-gray-100 rounded-r-full btn text-gray-700 hover:text-blue-700 flex space-x-2 items-center pl-5',
                            {'bg-blue-100 text-blue-600':currMenu=='doc'}]"  @click.stop="$emit('setMenu','doc')">
                    <img src="@/assets/word.png" class="h-5 w-5 rounded-full">
                    <a class="invisible lg:visible">Documents</a>
                </li>
                <li :class="['py-1 px-3 bg-white hover:bg-gray-100 rounded-r-full btn text-gray-700 hover:text-blue-700 flex space-x-2 items-center pl-5',
                            {'bg-blue-100 text-blue-600':currMenu=='excel'}]" @click.stop="$emit('setMenu','excel')">
                    <img src="@/assets/msexcel.png" class="h-5 w-5 rounded-full">
                    <a class="invisible lg:visible">Excel files</a>
                </li>
                <li :class="['py-1 px-3 bg-white hover:bg-gray-100 rounded-r-full btn text-gray-700 hover:text-blue-700 flex space-x-2 items-center pl-5',
                            {'bg-blue-100 text-blue-600':currMenu=='ppt'}]" @click.stop="$emit('setMenu','ppt')">
                    <img src="@/assets/ppt.png" class="h-5 w-5 rounded-full">
                    <a class="invisible lg:visible">Powerpoint</a>
                </li>
                <li :class="['py-1 px-3 bg-white hover:bg-gray-100 rounded-r-full btn text-gray-700 hover:text-blue-700 flex space-x-2 items-center pl-5',
                            {'bg-blue-100 text-blue-600':currMenu=='pdf'}]" @click.stop="$emit('setMenu','pdf')">
                    <img src="@/assets/pdf.png" class="h-5 w-5 rounded-full">
                    <a class="invisible lg:visible">Pdf Files</a>
                </li>                
            </ul>
            <div class="border-b border-gray-300 w-full"></div>
            <input type="file" multiple style="display:none" ref="files" @change="filesAdded"/>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
export default {
    setup(_,{emit}){    
        const files=ref(null);
        const filesAdded=(ev)=>{     
            if(ev && ev.target && ev.target.files){       
                emit('filesAdded',ev.target.files);     
                files.value.value="";       
            }
        }
        return {files,filesAdded};
    },
    emits:['filesAdded','setMenu'],
    props:['currMenu']
}
</script>

<style scoped>
.sideNav > div{      
    position: sticky;
    top:8vh; 
}
.sideNav{
    min-height: 92vh;
}
</style>