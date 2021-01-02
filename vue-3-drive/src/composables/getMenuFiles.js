import {getFileType} from '@/composables/getFileType';    
import {ref,watchEffect} from 'vue'
export const getMenuFiles=(files,menu)=>{
    const retDt=ref([]);
    watchEffect(()=>{
        retDt.value.splice(0);
        files.value.filter(el=>{
            if(menu.value=='all') return true;
            else return getFileType(el.file)==menu.value;
        }).forEach(el=>{
            retDt.value.push(el);
        });
    });
    return retDt;
}