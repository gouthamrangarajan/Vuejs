const getFileType=(fl)=>{
    if(fl){
        const {type}=fl;  
        if(type.startsWith("image/")){
            return 'img';
        }
        else if(type.startsWith("text/") || type.startsWith("application/json") || 
            type.startsWith('application/vnd.ms-excel')){
            return 'txt';
        }
        else if(type.startsWith("application/pdf")){
            return 'pdf';
        }
        else if(type.startsWith("application/vnd.openxmlformats-officedocument.presentationml.presentation")){
            return 'ppt';
        }
        else if(type.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
            return "doc";
        }
        else if(type.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
            return "excel";
        }
    }
    return ''
}

export default getFileType;