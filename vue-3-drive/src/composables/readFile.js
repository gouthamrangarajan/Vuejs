import {ref} from 'vue'
export const readFile=(file)=>{     
    const result=ref(null)
    if(file && file.type){
        const {type}=file;  
        if(type.startsWith("image/")){            
            const fileRead=new FileReader();
            fileRead.onload=(e)=>{
                result.value= e.target.result;                
            }
            fileRead.readAsDataURL(file);
        }
        else if(type.startsWith("text/") || type.startsWith("application/json") || 
              type.startsWith('application/vnd.ms-excel')){         
            const fileRead=new FileReader();
            fileRead.onload=(e)=>{
                result.value= e.target.result                
            }
            fileRead.readAsText(file);
        }  
    }
    return result
}