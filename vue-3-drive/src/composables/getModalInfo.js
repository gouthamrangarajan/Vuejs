import getFileType from '@/composables/getFileType';    
import {ref} from 'vue'

const getModalInfo=(sortedFiles)=>{
    const showModal=ref(false);
    const modalFile=ref(new File([""],"dummy"));
    let modalFileId=0;
    const openModal=(info)=>{
        let fileType=getFileType(info.file);                
        if(fileType=='img' || fileType=='txt'){
            showModal.value=true;
            modalFile.value=info.file;       
            modalFileId=info.id;      
        }                       
    }
    const moveModalFile=(indicator)=>{                
        if(indicator=='prev'){                    
            modalFileId++;
            if(!sortedFiles.value.filter(el=>el.id==modalFileId)[0]){
                modalFileId=1
            } 
            let index=1;
            while(getFileType(sortedFiles.value.filter(el=>el.id==modalFileId)[0].file)!='img'
                 && getFileType(sortedFiles.value.filter(el=>el.id==modalFileId)[0].file)!='txt'){
                modalFileId++;
                if(!sortedFiles.value.filter(el=>el.id==modalFileId)[0]){
                    modalFileId=1
                }
                index++;
                if(index>1000)
                    break;
            }                    
        }
        else if(indicator=='next'){
            modalFileId--;
            if(modalFileId<1){
                modalFileId=sortedFiles.value.reduce((max,el)=>max>el.id?max:el.id,sortedFiles.value[0].id);                        
            }         
            let index=1;
            while(getFileType(sortedFiles.value.filter(el=>el.id==modalFileId)[0].file)!='img'
                 && getFileType(sortedFiles.value.filter(el=>el.id==modalFileId)[0].file)!='txt'){
                modalFileId--;
                if(modalFileId<1){
                    modalFileId=sortedFiles.value.reduce((max,el)=>max>el.id?max:el.id,sortedFiles.value[0].id);
                }      
                index++;
                if(index>1000)
                    break;   
            }
        }
        modalFile.value=sortedFiles.value.filter(el=>el.id==modalFileId)[0].file;
    }

    return {showModal,modalFile,openModal,moveModalFile}
}

export default getModalInfo;