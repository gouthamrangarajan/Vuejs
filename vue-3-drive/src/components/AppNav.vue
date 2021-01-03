<template>
  <nav class="bg-white border-b border-gray-300 sticky top-0 flex justify-between py-2 px-4 items-center z-10">  
      <div class="h-8 w-8 cursor-pointer pt-1 flex items-center space-x-2" @click="$emit('setMenu','all')">
        <img src="@/assets/logo.png" class="object-contain"/>
        <span class="text-xl text-gray-700">Drive</span>
      </div>      
      <div :class="['absolute flex flex-col rounded search top-0 mt-2 right-0 mr-4',
                    {'h-10 bg-gray-100':!srchOpen},{'h-64 bg-white shadow search--open':srchOpen}]">
        <div class="flex items-center justify-between  py-2 px-4 ">
          <div class="flex items-center space-x-1">
            <i class="material-icons">search</i>
            <input class="w-32 lg:w-64 border-none outline-none bg-transparent" placeholder="Search in Drive" v-model.trim="srchTxt"
              @focus="srchOpen=true" @click.stop> 
          </div>
          <i class="material-icons">arrow_drop_down</i>
        </div>
        <transition-group name="fade" tag="ul" :class="[{'w-88 lg:w-full border-t border-gray-300 mt-3 py-1 search__results h-56':srchOpen}]">
          <li v-for="item in srchResults" :key="item" class="py-1 px-3 hover:bg-gray-300 text-gray-700 cursor-pointer rounded"
            @click.stop="selectFile(item)">
            <a>{{item}}</a>
          </li>
        </transition-group>
      </div>            
  </nav>
</template>

<script>
export default { 
  props:{
    files:{
      type:Array,
      required:true
    }
  },
  data(){
    return{
      srchTxt:'',
      srchOpen:false
    }
  },
  computed:{
     srchResults(){
      let lclSrchTxt=this.srchTxt.toLowerCase()            
      return this.files.filter(el=>{
          if(lclSrchTxt=='')
            return true;
          else return el.toLowerCase().indexOf(lclSrchTxt)>-1;
        }).sort() 
     }
  },
  methods:{
    selectFile(fileName){
      this.$emit('fileSelected',fileName);
      this.hideSrchResults();
    },
    hideSrchResults(){
      this.srchOpen=false;
    }
  },
  emits:['setMenu','fileSelected'],
  mounted(){
    window.addEventListener('click',this.hideSrchResults);
  },
  unmounted(){
    window.removeEventListener('click',this.hideSrchResults);
  }
};
</script>
<style scoped>
nav{
    height: 8vh;
}
li{
  transition: all 0.3s;
}
.search{
  transition: all 0.3s;
  overflow:hidden 
}
.search__results{
   transition: all 0.3s;
   overflow-y:auto;
   overflow-x:hidden
}
.search__results::-webkit-scrollbar {
  width:0.3rem;
} 
.search__results::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.search__results::-webkit-scrollbar-thumb {
    background-color:#718096;
    outline: 1px solid #718096;
    border-radius:4px;
}
</style>