<template>
  <div class="min-h-screen min-w-screen">
    <AppNav :files="fileNames" @setMenu="setMenu" @fileSelected="searchFileAndOpenModal"></AppNav>
    <div class="flex space-x-2 py-1 px-3">   
      <AppSideNav @filesAdded="addFiles" :currMenu="currMenu" @setMenu="setMenu"></AppSideNav>
      <Landing :files="sortedFiles" @filesAdded="addFiles" @fileSelected="openModal"></Landing>
    </div>
    <AppModal v-model="showModal" :file="modalFile" @progress="moveModalFile"></AppModal>
  </div>
</template>

<script>
import useFiles from "@/composables/useFiles";
import {defineAsyncComponent,computed,ref,watch, watchEffect} from "vue";
import getModalInfo from '@/composables/getModalInfo';
import getMenuFiles from '@/composables/getMenuFiles';
export default {
  name: "App",
  setup(){       
    const {fileList,addFiles} = useFiles();
    const fileNames=computed(()=>{      
      return fileList.value.map(el=>el.name)
    })
    const currMenu=ref('all')
    const setMenu=(mn)=>{
      currMenu.value=mn
    }
    watchEffect(()=>{
      if(fileList.value.length>0)
        setMenu('all')
    })
    const menuFiles=getMenuFiles(fileList,currMenu)
    const sortedFiles=computed(()=>{
        let dt=[];
        menuFiles.value.forEach(el=>dt.push(el));
        return dt.sort((el1,el2)=>el2.id-el1.id);                                
    });                
    const {modalFile,moveModalFile,showModal,openModal} = getModalInfo(sortedFiles);
    
    watch(showModal,()=>{
      setMenu('all')
    })

    const searchFileAndOpenModal=(fileName)=>{      
      setMenu('all')
      const info=fileList.value.filter(el=>el.name==fileName)[0]
      openModal(info)
    }
    const AppNav=defineAsyncComponent(()=>import('@/components/AppNav.vue'));
    const AppSideNav=defineAsyncComponent(()=>import('@/components/AppSideNav.vue'));
    const Landing=defineAsyncComponent(()=>import('@/components/Landing.vue'));
    const AppModal=defineAsyncComponent(()=>import('@/components/AppModal.vue'));
    return {sortedFiles,addFiles,fileNames,modalFile,moveModalFile,showModal,openModal,
            currMenu,setMenu,searchFileAndOpenModal,
            AppNav,AppSideNav,Landing,AppModal};
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
*{
  margin:0;
  padding:0;
}
body{
  font-family: 'Lato', sans-serif;
  overflow-x:hidden;
}
body::-webkit-scrollbar {
  width:0.2rem;
} 
body::-webkit-scrollbar-thumb {
    background-color:#718096;
    outline: 1px solid #718096;
    border-radius:4px;
}
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.fade-move{
    transition: all 0.3s;
}
.fade-enter-active,
.fade-leave-active{
    transition:all 0.3s;
}
.fade-enter-from,
.fade-leave-to{
    opacity:0;
}
.btn{
  transition:all 0.3s;
}
</style>