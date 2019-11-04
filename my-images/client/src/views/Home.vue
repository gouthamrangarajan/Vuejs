<template>
  <section class="hero is-grey is-bold">
    <div class="hero-body">
      <div class="container">  
          <modal :open="showModal" @close="showModal=false" :imageNum="selectedImgNum"></modal>     
          <transition-group name="imgs" class="columns" v-for="num in outerLen" :key="num" tag="div" appear>
              <div class="column is-4" v-for="innum in 3" :key="'in'+innum">
                  <template v-if="innum+((num-1)*3)<=imgsLen">
                    <image-card :num="innum+((num-1)*3)" @imageSelected="changeSelImg(innum+((num-1)*3))"></image-card>
                  </template>
              </div>        
          </transition-group>            
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
    return {selectedImgNum:-1,showModal:false}
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
      this.selectedImgNum=num;
      this.showModal=true;
    }
  },
  mounted(){
    
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

.imgs-move{
  transition:all 0.3s;
}
.imgs-enter-active,
.imgs-leave-active{
 transition:all 0.5s;
}

.imgs-enter,.imgs-leave-to{
  opacity: 0;
  transform: translateX(1rem);
}

</style>