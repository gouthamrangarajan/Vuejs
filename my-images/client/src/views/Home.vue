<template>
<transition-group name="fade" tag="section" appear>  
   <div class="switch right deep-orange-text" :key="1">
    <label>      
      <input type="checkbox" v-model="reverseData">
      <span class="lever"></span>     
    </label>
    Recent first
  </div>  
  <transition-group  name="img" tag="div" :key="2">
    <div class="row clearfix" tag="div" v-for="num in outerLen" :key="num" v-show="showImgs">
            <div class="col m4" v-for="innum in 3" :key="'in'+num+innum">   
              <transition name="img">                           
                <template v-if="getImgNum(num,innum)<=imgLen && getImgNum(num,innum)>0"> 
                  <image-card :num="getImgNum(num,innum)" :key="'imgCard'+num+innum"></image-card>                
                </template>           
              </transition>
            </div>        
      </div>          
  </transition-group>  
   <div class="switch right red-text" :key="3">
    <label>      
      <input type="checkbox" v-model="reverseData">
      <span class="lever"></span>     
    </label>
    Recent first
  </div>  
  <File-Upload :key="4"></File-Upload>
</transition-group>
</template>

<script>
// @ is an alias to /src
import ImageCard from '@/components/ImageCard.vue'
import FileUpload from '@/components/FileUpload.vue'
import {mapState} from 'vuex'
export default {
  name: 'home',
  data(){
    return {reverseData:false,showImgs:true}
  },
  components: {
    ImageCard,FileUpload
  },  
  computed:{
    ...mapState(['imgLen']),
    outerLen(){
      return Math.ceil(this.imgLen/3);
    }
  },
 
  methods:{
    intializeMaterialBox(){
       setTimeout(() => {
          var elems = document.querySelectorAll('.materialboxed');
          var instances = M.Materialbox.init(elems, {});
        }, 3000);   
    },    
    getImgNum(outerNum,innerNum){     
       var data= (innerNum+((outerNum-1)*3));
       if(this.reverseData){
         data=(this.imgLen+1)-data;
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
    this.intializeMaterialBox();
  },
  watch:{
    reverseData(){this.refreshAll();},
    imgLen(newVal,oldVal){        
      if(newVal<oldVal){         
        this.refreshAll();   
      }
      this.intializeMaterialBox();
    }
  }
}
</script>
<style scoped>
.switch{
  padding-right: 1rem;
  padding-top:1rem;
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

</style>