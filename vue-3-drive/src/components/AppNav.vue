<template>
  <nav class="bg-white border-b border-gray-300 sticky top-0 flex justify-between py-2 px-4 items-center z-10">  
      <div class="h-8 w-8 cursor-pointer pt-1 flex items-center space-x-2" @click="$emit('setMenu','all')">
        <img src="@/assets/logo.png" class="object-contain"/>
        <span class="text-xl text-gray-700">Drive</span>
      </div>      
      <div :class="['absolute flex flex-col rounded search top-0 mt-2 right-0 mr-4',
                    {'h-10 bg-gray-100':!srchOpen},{'h-64 bg-white shadow search--open':srchOpen}]">
        <div class="flex items-center justify-between  py-2 px-4 ">
          <div class="flex items-center space-x-1">
            <i class="material-icons">search</i>
            <input class="w-32 lg:w-64 border-none outline-none bg-transparent" placeholder="Search in Drive" v-model.trim="srchTxt"
              @focus="srchOpen=true" @click.stop="srchOpen=true"> 
          </div>
          <i class="material-icons">arrow_drop_down</i>
        </div>
        <transition-group name="fade" tag="ul" :class="[{'h-0':!srchOpen},{'w-full mt-3 py-1 search__results h-56':srchOpen}]">
          <li v-for="item in srchResults" :key="item" class="w-56 lg:w-96 py-1 px-3 hover:bg-gray-300 text-gray-700 cursor-pointer"
            @click.stop="selectFile(item)">
            <a>{{item}}</a>
          </li>
        </transition-group>
      </div>            
  </nav>
</template>

<script>
import {ref,computed, onMounted, onUnmounted} from 'vue'
export default { 
  props:{
    files:{
      type:Array,
      required:true
    }
  },
  setup(props,{emit}){
    const srchTxt=ref('');
    const srchOpen=ref(false);
    const srchResults=computed(()=>{
      let lclSrchTxt=srchTxt.value.toLowerCase()            
      return props.files.filter(el=>{
          if(lclSrchTxt=='')
            return true;
          else return el.toLowerCase().indexOf(lclSrchTxt)>-1;
        }).sort() 
    });
    const selectFile=(fileName)=>{
       emit('fileSelected',fileName);
       hideSrchResults();
    };
    const hideSrchResults=()=>{
      srchOpen.value=false;
    }
    onMounted(()=>{
      window.addEventListener('click',hideSrchResults);
    });
    onUnmounted(()=>{
      window.removeEventListener('click',hideSrchResults);
    })
    return {srchTxt,srchOpen,srchResults,selectFile,selectFile,hideSrchResults}
  },  
  emits:['setMenu','fileSelected'],  
};
</script>
<style scoped>
nav{
    height: 8vh;
}

li,.search{
  transition: all 0.3s;
  overflow:hidden 
}
.search__results{
   transition: all 0.3s;
   overflow-y:auto;
   overflow-x:hidden
}
.search__results::-webkit-scrollbar {
  width:0.3rem;
} 
.search__results::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.search__results::-webkit-scrollbar-thumb {
    background-color:#718096;
    outline: 1px solid #718096;
    border-radius:4px;
}
</style>