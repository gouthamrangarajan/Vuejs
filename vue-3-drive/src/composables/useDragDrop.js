import {ref} from 'vue'

export const useDragDrop=()=>{
    const dragging=ref(false);
    const fileList=ref([]);    

    const addFiles=(data)=>{
        fileList.value.splice(0);
        for(let index=0;index<data.length;index++){
            if(data[index].type && data[index].type=="application/x-msdownload")
                continue;            
            fileList.value.push(data[index]);            
        } 
    }
    const dropped=(event)=>{                 
        if(event.dataTransfer.files){
            var fls=event.dataTransfer.files;         
            if(fls){
               addFiles(fls);                        
            }
        }                    
        dragging.value=false;
    }
   const setDrag=(dragged)=>{     
        dragging.value=dragged;        
    }
    return {dragging,fileList,dropped,setDrag}
}