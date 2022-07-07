<template>
    <v-row class="fill-height pa-1" >
        <v-col cols="12" lg="5" :class="['d-flex flex-column justify-center align-center', {'drag-hover':dragging}]"
            @drop.prevent.stop="dropped" @dragover.prevent.stop="setDrag(true)"  @dragleave.prevent.stop="setDrag(false)">
            <v-file-input
                multiple
                hide-input              
                prepend-icon="mdi-cloud-upload"
                class="d-none"   
                ref="fileUplEl"             
                @change="fileUplElChanged"
                ></v-file-input>
              <v-icon size="100" color="grey darken-2">mdi-cloud-upload</v-icon>
              <span class="text-h4 mt-12 grey--text text--darken-2">Some Text....</span>
              <v-btn
               class="mt-12"
              color="primary"
              dark
              @click="mimicFileUplClick"
            >
              Select Files
            </v-btn>            
            </v-col>
            <v-col cols="9" lg="4" class="d-flex">
                <v-divider vertical class="d-none d-lg-flex"
                    ></v-divider>                
                <ConsolidateFilesList :files="consolidatedFiles"></ConsolidateFilesList>                
            </v-col>
            <v-col cols="3" >
                <v-divider vertical
                    ></v-divider>
            </v-col>
    </v-row>
</template>

<script setup>
import ConsolidateFilesList from "./ConsolidateFilesList.vue"
import {computed, ref, watch} from 'vue'
import useDragDrop from "@/composables/useDragDrop";  
const fileUplEl=ref();
const fileListFromUplEl=ref([]);
const mimicFileUplClick=()=>{
    fileUplEl.value.$refs.input.click()
}
const {dragging,setDrag,dropped,fileList:fileListFromDragDrop} = useDragDrop(); 
watch(fileListFromDragDrop,(newVal)=>{
    console.log('filesDropped via drag drop',newVal);
    //if needed callApi with consolidatedFiles
});
const fileUplElChanged=(ev)=>{
    console.log("vuetify file input changed",ev)
    for(let idx=0;idx<ev.length;idx++){
        let file=ev[idx];
        fileListFromUplEl.value.push(file);
    }
    fileUplEl.value.$refs.input.value=null;
    //if needed callApi with consolidatedFiles
}
const consolidatedFiles=computed(()=>{
    let consolidated=[];
    for(let idx=0;idx<fileListFromDragDrop.value.length;idx++){
        let file=fileListFromDragDrop.value[idx];
        consolidated.push(file);
    }
    for(let idx=0;idx<fileListFromUplEl.value.length;idx++){
        let file=fileListFromUplEl.value[idx];
        consolidated.push(file);
    }    
    console.log('consolidated',consolidated);
    return consolidated;
})
</script>

<style scoped>
.drag-hover{
    border:2px dashed;
    border-color: rgb(37, 99, 235);
    border-radius: 5px;
}
</style>
