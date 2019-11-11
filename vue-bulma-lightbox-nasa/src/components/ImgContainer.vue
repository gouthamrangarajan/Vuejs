<template>
<transition name="imgs" appear>
<section class="hero is-light is-bold">
  <div class="hero-body">
      <div v-for="(outInd,outKey) in outerLoop" class="columns  imgs" :key="outKey">
        <figure class="image column"
                v-for="ind in innerLoop(outInd)"
                :key="imgs[(outInd-1)*5+(ind-1)].id" 
                @click.stop="$emit('selected',(imgs[(outInd-1)*5+(ind-1)].id))">
          <img  class="column"
              :src="imgs[(outInd-1)*5+(ind-1)].src"
              />
        </figure>
      </div>
    </div>
  </section>
  </transition>     
</template>
<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator';
import {IImage} from './../models/IImage'
@Component
export default class ImgContainer extends Vue{
  @Prop({required:true})
  imgs!:IImage[]

  innerLoop(outerLoopNum:number):number{    
    var maxInd=(outerLoopNum-1)*5+(5-1);    
    if(this.imgs.length> maxInd)
      return 5;
    else
      return this.imgs.length-(outerLoopNum-1)*5;    
  }

  get outerLoop():number{
    return Math.ceil(this.imgs.length/5);
  }
}
</script>

<style scoped>
.columns.is-gapless .column{
  padding:0rem;
}
.columns.is-gapless{
  margin-bottom:0 !important;
}
.imgs img{
  cursor:pointer;
}
.imgs{
  height:22vh;
  overflow: hidden;
}
.hero{
  height: 93vh;
}
</style>
