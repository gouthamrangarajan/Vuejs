<template>
    <transition name="imgs">
  <section :class="{'modal':true,'is-active':true}" 
           v-show="showModal">
   <div class="modal-content columns">  
     <div class="column">
  <div class="button  is-white is-outlined"  @click.stop="changeSelectedImgId(-1)">
          <span class="icon">
    <i class="fas fa-caret-left fa-2x">         
        </i>
        </span>             
     </div>
     </div>
     <div class="column is-four-fifths modal-img">
     <transition :name="transition">
      <img :src="selectedImgSrc"
           v-if="showModalImg"/>
       </transition>
    </div>
      <div class="column">
        <div class="button is-white is-outlined" @click.stop="changeSelectedImgId(1)">
          <span class="icon">
   <i class="fas fa-caret-right fa-2x">         
        </i>
        </span>             
     </div>
     </div>
    </div>
    <button class="modal-close is-large"
            aria-label="close"  @click.stop="$emit('close')">      
    </button>
  </section>
  </transition>
</template>
<script lang="ts">
import { Component, Vue,Prop, Watch } from 'vue-property-decorator';
import {IImage} from './../models/IImage'
@Component
export default class Modal extends Vue{
    @Prop({required:true})
    imgs!:IImage[]
    @Prop({required:true})
    initialImgId!:number    
    @Prop({required:true})
    showModal!:boolean

    transition:string='left';
    selectedImgId:number=-1;
    showModalImg:boolean=false;

    @Watch('initialImgId')
    onInitialImgId(value:number,oldValue:number){
        this.selectedImgId=value;
    }

    @Watch('selectedImgId')
    onSelectedImgIdChanged(){
      this.showModalImg=false;
      this.$nextTick(()=>this.showModalImg=true);
    }

    get selectedImgSrc():string{
      if(this.selectedImgId>-1)
        return this.imgs.filter(el=>el.id==this.selectedImgId)[0].src;
      else
        return '';
    
    }
    changeSelectedImgId(data:number){
        if(data==1){
            this.transition='left';  
            if(this.selectedImgId==this.imgs.length)
             this.selectedImgId=1;
            else
             this.selectedImgId++;
      
        }                  
        else{
            this.transition='right';
            if(this.selectedImgId==1)
              this.selectedImgId=this.imgs.length;
            else
              this.selectedImgId--;
        }
                
    }
}
</script>
<style scoped>
.left-enter-active,
.left-leave-active
{
  transition:all 0.3s;
}

.left-enter,
.left-leave-to{
  opacity:0;
  transform:translateX(2rem);
}

.right-enter-active,
.right-leave-active
{
  transition:all 0.3s;
}

.right-enter,
.right-leave-to{
  opacity:0;
  transform:translateX(-2rem);
}
.modal-content{
  height:100%;
  width:100%;
  text-align:center;
  overflow:hidden;
}

.modal-close{
  background-color:rgba(10,10,10,.3);
}
.modal-content img{
  max-width:80rem;
  max-height:50rem;
}
.column .button{
  margin-top:20rem;
}
@media only screen  and (max-width:768px){
  .column .button{
    margin-top:0rem;
  }
}
</style>
