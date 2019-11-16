<template>
  <section class="hero is-light is-bold">
    <div class="hero-body">
      <div class="container">  
          <modal :open="showModal" @close="showModal=false" :imageInd="selectedImgInd"></modal> 
          <div class="field">
            <div class="control is-pulled-right">
              <label class="checkbox has-text-danger">
                <input type="checkbox" v-model="reverseData">
                  Show recent first
              </label>
            </div>
         </div>    
          <div class="columns" tag="div" v-for="num in outerLen" :key="num">
              <div class="column is-4" v-for="innum in 3" :key="'in'+num+innum">   
                <transition name="img">                           
                  <template v-if="showImgs && getImgNum(num,innum)<=imgsLen && getImgNum(num,innum)>0"> 
                    <image-card :num="getImgNum(num,innum)" :key="'imgCard'+num+innum"                      
                        @imageSelected="changeSelImg(getImgNum(num,innum))"></image-card>                
                  </template>           
                </transition>
              </div>        
          </div>  
          <div class="field">
            <div class="control is-pulled-right">
              <label class="checkbox has-text-danger">
                <input type="checkbox" v-model="reverseData">
                  Show recent first
              </label>
            </div>
         </div>          
      </div>      
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import ImageCard from '@/components/ImageCard.vue'
import Modal from '@/components/Modal.vue'
export default {
  name: 'home',
  data(){
    return {selectedImgInd:-1,showModal:false,reverseData:false,showImgs:true}
  },
  components: {
    ImageCard,Modal
  },
  computed:{
    imgsLen(){return this.$store.state.imgLen;},
    outerLen(){
      return Math.ceil(this.imgsLen/3);
    }
  },
  methods:{
    changeSelImg(num){
      this.selectedImgInd=num;
      this.showModal=true;
    },
    getImgNum(outerNum,innerNum){
       var data= (innerNum+((outerNum-1)*3));
       if(this.reverseData){
         data=(this.imgsLen+1)-data;
       }       
       return data;
    },
    refreshAll(){
      this.showImgs=false;
      setTimeout(()=>{
        this.showImgs=true;
      },300);

    }
  },
  mounted(){
    
  },
  watch:{
    reverseData(){this.refreshAll();},
    imgsLen(newVal,oldVal){        
      if(newVal<oldVal){         
        this.refreshAll();   
      }
    }
  }
}
</script>
<style scoped>
.hero{
   height: 92.5vh;
   overflow-Y: auto;
   overflow-X:hidden;
   scroll-behavior: smooth;
}


.img-enter-active,
.img-leave-active{
 transition:all 0.3s;
}

.img-enter,.img-leave-to{
  opacity: 0;
  transform: translateX(10rem);
}
.img-move{
  transition:all 0.3s;
}
.field{
  position: absolute;
  width:100%;
  margin-top:-1.5rem;  
  z-index:100;
}
</style>