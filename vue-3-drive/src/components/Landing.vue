<template>
    <div :class="['landing flex-1 w-full flex',{'file-hover':dragging,'items-center justify-center':files.length==0,
                    'items-start justify-start':files.length>0}]"
        @drop.prevent.stop="dropped" @dragover.prevent.stop="setDrag(true)"  @dragleave.prevent.stop="setDrag(false)">
        <transition name="fade" mode="out-in">
            <span class="text-gray-600 -mt-24" :key="1" v-if="files.length==0">You can drag files right into Drive</span>
            <div v-else :key="2" class="flex flex-col lg:flex-row flex-wrap space-x-2 space-y-2 items-start justify-start">
                <transition-group  name="fade">
                    <div @click="$emit('fileSelected',info)"  v-for="(info,index) in files"
                        :key="info.id" :class="{'mt-2 ml-2':index==0}">
                        <AppFile :file="info.file"></AppFile>
                    </div>
                </transition-group>
            </div>            
        </transition>        
    </div>
</template>

<script>
    import {useDragDrop} from "@/composables/useDragDrop";    
    import {ref,defineAsyncComponent,computed, watchEffect} from "vue";
    export default {
        setup(_,{emit}){
            const {dragging,setDrag,dropped,fileList:dragDropFiles} = useDragDrop();                                                                          
            watchEffect(()=>{
                if(dragDropFiles && dragDropFiles.value && dragDropFiles.value.length && dragDropFiles.value.length>0)
                    emit('filesAdded',dragDropFiles.value);
            });                      
            const AppFile=defineAsyncComponent(()=>import('@/components/AppFile.vue'));            
            return {dragging,setDrag,dropped,AppFile};
        },
        props:['files'],
        emits:['filesAdded','fileSelected']
    }
</script>

<style scoped>
.file-hover{
    border:2px dashed;
    border-color: rgb(37, 99, 235);
}
.landing{
    transition: all 0.3s;
    min-height: 92vh;
}
</style>
