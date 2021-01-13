import {ref} from 'vue'

const useFiles=()=>{

    const fileList=ref([]);
    let nextFileId=1;
    const addFiles=(data)=>{
        for(let index=0;index<data.length;index++){
            if(data[index].type && data[index].type=="application/x-msdownload")
                continue;            
            fileList.value.push({id:nextFileId++,file:data[index],name:data[index].name});
        } 
    }
    return {fileList,addFiles}
}

export default useFiles;