<template>
  <transition name="fade" appear>
     <div class="notification">                         
        <span class="title is-6">
                {{mdFile.data.name}}
          </span>
            <br/>
          <span class="subtitle is-6 has-text-grey">
            {{fileSize}}
            </span>
            <div class="control is-pulled-right">
              <input class="input is-danger" type="text" placeholder="Comments..."/> 
            </div>
            <transition name="item">
              <div v-if="mdFile.progress!=100">
                <p class="has-text-centered">
                  Uploading {{mdFile.progress}}%...
                </p>              
                <progress class="progress is-link is-small" :value="mdFile.progress" max="100"> </progress> 
              </div>
            </transition>
      <button class="delete" @click.stop="remove"></button>  
    </div>
  </transition>    
</template>

<script lang="ts">
import {Component,Vue,Prop} from 'vue-property-decorator';
import { IFile } from './../models/IFile';
interface imdFile extends IFile{
  progress:number
}
@Component
export default class FileData extends Vue{
    @Prop({required:true})
    file!:IFile;

    mdFile:imdFile={progress:1} as any;

    created(){      
      this.mdFile.id=this.file.id;
      this.mdFile.data=this.file.data;
      for(var i=2;i<=100;i++){
        setTimeout(()=>{
          this.mdFile.progress=this.mdFile.progress+1;
        },i*5);
      }
    }
     remove():void{
      this.$emit('remove');
    }
    get fileSize():string{
      return (parseInt((this.mdFile.data.size/1024).toString()) +1).toString() +' kb';
    }
}
</script>

<style scoped>

.control{
  width:20rem;
  margin-top:-1rem;
}

.notification{
  margin-bottom:0.1rem!important;
  max-height:7rem!important;
}

@media only screen and (max-width:700px){
    .control{
    width:15rem;
  }
    .notification{
    height:10rem!important;
  }
}

</style>

