<template>
<transition name="slide" appear>
    <div class="container">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Drag & Drop File(s)
                </p>  
            </header>
            <div class="card-content">
                <div :class="{'dropZone':true,'dragged':dragging}" @drop.prevent.stop="dropped"
                @dragover.prevent.stop="drag(true,$event)"   @dragleave.prevent.stop="drag(false)">
                    <div class="file is-primary">
                    <label class="file-label">
                        <input class="file-input" type="file"  multiple @change="fileChanged" ref="fileEl">
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose file(s)…
                        </span>
                        </span>
                    </label>
                    </div>
                    <transition-group name="item">
                        <FileData v-for="file in files" :key="file.id" @remove="removeFile(file.id)"
                            :file="file">             
                        </FileData>             
                    </transition-group>           
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item">
                    Drop files in the above highlighted space
                </a>
                <a class="card-footer-item" 
                    @click="clear">
                    Clear All
                </a>
            </footer>
        </div>
    </div>
</transition>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { IFile } from './../models/IFile';
import FileData from './FileData.vue';

@Component({
   components: {
    FileData
  }
})


export default class FilesContainer extends Vue{  
  maxFileId:number=1;
  files:IFile[]=[];
  dragging:boolean=false;
   $refs!:{
       fileEl:HTMLFormElement
   }
   dropped(event:any){                 
      if(event.dataTransfer.files){
        var fl=event.dataTransfer.files;
        for(var i=0;i<fl.length;i++){
           var dt:IFile={id:this.maxFileId,data:fl[i]};           
           this.files.push(dt);            
           this.maxFileId++;
        }
      }
      this.dragging=false;
    }
    fileChanged(event:any){      
      var fl=event.target.files;
        for(var i=0;i<fl.length;i++){
           var dt:IFile={id:this.maxFileId,data:fl[i]};           
           this.files.push(dt);            
           this.maxFileId++;
        }
      this.$refs.fileEl.value='';      
    }
    drag(dragged:boolean,event:any){     
      this.dragging=dragged;        
    }
    removeFile(id:number){
      this.files=this.files.filter(el=>el.id!=id);
    }
    clear(){
      this.files.splice(0);
    }
    @Watch('files',{deep:true})
    onFilesChanged(newVal:any[],oldVal:any[]){        
        if(newVal.length==0){            
          this.maxFileId=1;
        }   
    }
}
</script>
<style scoped>
.container{  
  width:98%;
}

@media only screen and (min-width:1024px){
  .container{
    width:60%;
  }
}
.slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
}
.slide-enter,.slide-leave-to{
    transform: translateX(40rem);
}

.dropZone{
  min-height:5rem;
  border:2px dashed;
  border-color:rgba(0,0,0,.2);
}

.dragged{
 background-color:rgba(0,0,0,.1);
}

.card-content{
  max-height:30rem;
  overflow-Y:auto;
}

.file{
 margin:1rem;
}

</style>
