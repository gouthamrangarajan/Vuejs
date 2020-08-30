<template>
  <div id="app" class="app bg-gray-100 h-screen flex flex-col items-center">
     <AppNav></AppNav>
     <div class="app__section py-4 px-6 bg-white w-full lg:w-1/2 rounded shadow mt-12 flex flex-col">
          <span class="text-lg text-orange-700 mb-2">Selected Range:&nbsp;&nbsp;&nbsp;{{selectedRange}}</span>
          <a class="btn w-full bg-pink-500 hover:bg-pink-600 py-2 px-4 rounded text-lg text-white text-center cursor-pointer"
              @click="showPicker=!showPicker">
             <transition name="fade" mode="out-in">
                <span key="1" v-if="!showPicker">Show</span>
                <span key="2" v-else>Hide</span>
             </transition>            
          </a>
           <transition name="fade">
               <DateRange v-show="showPicker" @select-range="selectedRange=$event.rangeStr"></DateRange>
            </transition>
     </div>
  </div>
</template>

<script>
import './styles.css'
import { defineAsyncComponent } from 'vue'
const AppNav=defineAsyncComponent({
  loader:()=>import('./components/AppNav')
})
const DateRange=defineAsyncComponent({
  loader:()=>import('./components/DateRange')
})
export default {
  name: 'App',
  components: {
    AppNav,
    DateRange
  },
  data(){
    return {
      showPicker:true,
      selectedRange:''
    }
  }
}
</script>

<style>
.btn{
  transition: all 0.3s;;
}
.fade-enter-active,
.fade-leave-active{
  transition :all 0.3s;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
.app__section{
  min-height: 25rem;
  transition: all 0.3s;
}
</style>
