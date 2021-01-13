import getFileType from '@/composables/getFileType';    
import {ref,watchEffect} from 'vue';

const getMenuFiles=(files,menu)=>{
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

export default getMenuFiles;