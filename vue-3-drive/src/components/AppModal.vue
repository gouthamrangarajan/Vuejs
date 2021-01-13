<template>
  <transition name="fade">
        <div class="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-20" 
            v-show="modelValue" @click="close">      
            <i class="btn cursor-pointer text-white material-icons absolute top-0 right-0 mt-4 mr-4 bg-black bg-opacity-75
                 p-1 rounded-full">
                close
            </i>    
            <i class="btn cursor-pointer p-1 rounded-full text-white absolute top-50 right-0 mr-2 material-icons bg-black bg-opacity-75"
                 @click.stop="$emit('progress','next')">
                navigate_next
            </i>
            <i class="btn cursor-pointer p-1 rounded-full text-white absolute top-50 left-0 ml-2 material-icons bg-black bg-opacity-75"
                 @click.stop="$emit('progress','prev')">
                navigate_before
            </i>
            <div :class="['rounded viewer p-1 flex',{'items-center justify-center':fileType!='txt'},
                            {'bg-white':fileType=='txt'},{'bg-black bg-opacity-75':loading}]" @click.stop>        
                <transition name="fade" mode="out-in">
                    <div v-if="loading" :key="1" class="w-full flex items-center justify-center">
                        <div class="animate-pulse flex space-x-4 w-full lg:w-4/12">                            
                            <div class="flex-1 space-y-4 py-1">
                                <!-- <div class="h-4  w-3/4 text-blue-600 text-xl">Loading...</div> -->
                                <div class="space-y-2">
                                    <div class="h-4 bg-gray-600 rounded"></div>
                                    <div class="h-4 bg-gray-600 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else :key="2">
                        <img v-if="fileType=='img'" :src="imgUrl" class="object-contain">
                        <pre  v-else-if="fileType=='txt'">{{txt}}</pre>
                        <div class="h-24 w-24" v-else></div>
                    </div>
                </transition>                        
            </div>
            <input type="text" style="display:none"  @keyup.right="checkAndProgress('next')" @keyup.left="checkAndProgress('prev')"
                ref="inp"/>
        </div>
    </transition>
</template>

<script>
    import getFileType from '@/composables/getFileType'    
    import readFile from '@/composables/readFile'
    import { watchEffect,ref, watch} from 'vue'
    export default {        
        props:{
            modelValue:{
                type:Boolean,
                required:true
            },
            file:{                
                required:true
            }
        },
        emits:['progress','update:modelValue'],
        setup(props,{emit}){
            const imgUrl=ref('');
            const txt=ref('');
            const loading=ref(false);
            const fileType=ref(null);
            let res=readFile(props.file)
            let stopFn=null
            watchEffect(()=>{
                fileType.value=getFileType(props.file);                
                if(props.modelValue){
                    loading.value=true
                    res=readFile(props.file)
                    if(stopFn)                        
                        stopFn();                    
                    stopFn=watch(res,()=>{                    
                        if(fileType.value=='img'){                        
                            imgUrl.value=res.value;
                        }
                        else if(fileType.value=='txt'){
                            txt.value=res.value
                        }
                        setTimeout(()=>{
                            loading.value=false
                        },1000);
                    })
                }
            });          
            const close=()=>{
                emit('update:modelValue',false);
            };
            const checkAndProgress=(indicator)=>{
                if(props.modelValue)
                    emit('progress',indicator);
            };
            return {imgUrl,txt,loading,fileType,close,checkAndProgress};
        },                              
    }    
</script>

<style scoped>
.viewer{
    width: 90%;
    height: 90%;
    overflow: auto;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.viewer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.viewer {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>