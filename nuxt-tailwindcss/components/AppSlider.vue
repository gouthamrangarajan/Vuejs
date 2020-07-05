<template>
<div class="slider flex items-center w-full rounded py-4 px-8 white-text shadow-2xl mt-2 lg:mt-0">
    <div class="flex justify-between w-full">
        <a class="py-2 px-4 border rounded bg-transparent hover:bg-gray-900
             shadow cursor-pointer opacity-75 hover:opacity-100  text-white border-none z-10"
            @click="decreaseIndex">
            <i class="material-icons">chevron_left</i>
        </a>
        <transition :name="transition">
            <nuxt-link class="slider-item py-2 px-4 border rounded bg-white hover:bg-gray-900 hover:text-white
                 shadow-md w-48 lg:w-64 cursor-pointer text-center border-none"
             v-show="showItem" :to="selectedItem.path" >
                {{selectedItem.name}}
            </nuxt-link>
        </transition>
        <a class="py-2 px-4 border rounded bg-transparent hover:bg-gray-900
             shadow cursor-pointer opacity-75 hover:opacity-100  text-white  border-none z-10"
            @click="increaseIndex">
            <i class="material-icons">chevron_right</i>
        </a>
    </div>
</div>     
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {selectedIndex:0,showItem:true,transition:'slide',intr:{}}
    },
   computed:{
       ...mapGetters({items:'stItems'}),
        selectedItem(){
            return this.items[this.selectedIndex]
        }
   },
   mounted(){
       this.startSlider()
   },   
   destroyed(){
       clearInterval(this.intr)
   },
   methods:{
       pauseSlider(){
           clearInterval(this.intr)
       },
       startSlider(){
        this.intr=setInterval(()=>{
            this.moveNext()
        },7000)
       },
       moveNext(){
          this.transition='slide-opp'
          this.showItem=false
          setTimeout(()=>{
            if(this.selectedIndex==this.items.length-1)
                this.selectedIndex=0
            else
                this.selectedIndex++
            this.transition='slide'
            this.showItem=true            
          },600)
       },
       movePrev(){
          this.transition='slide'
          this.showItem=false
          setTimeout(()=>{
            if(this.selectedIndex==0)
                this.selectedIndex=this.items.length-1
            else
                this.selectedIndex--
            this.transition='slide-opp'
            this.showItem=true            
          },600)
       },
       increaseIndex(){
          this.pauseSlider()
          this.moveNext()
          setTimeout(()=>{
              this.startSlider()
          },1000)
      },
      decreaseIndex(){
          this.pauseSlider()
          this.movePrev()
          setTimeout(()=>{
              this.startSlider()
          },1000)
      }
   }

}
</script>
<style scoped>
.slider{
    background:linear-gradient(0.25turn, #2b6cb0,#2c7a7b);
    height: 23rem;
}
@media only screen and (max-width:991px){
  .slider{
    height: 15rem;
  }
}
.slide-enter-active,
.slide-leave-active,
.slide-opp-enter-active,
.slide-opp-leave-active{
    transition: all 0.5s;
}
.slide-enter,
.slide-leave-to{
    transform: translateX(15rem);
    opacity: 0.2;
}

.slide-opp-enter,
.slide-opp-leave-to{
    transform: translateX(-15rem);
    opacity: 0.2;
}
</style>