<template>
     <div :class="{'dropdown':true,'is-active':dataAvailable}">
 <div class="dropdown-trigger">
  <div :class="{'control':true,'is-loading':searching}">
<transition name="search" appear>
 <input class="input search" type="text" v-model="ftTxt"
    placeholder="Search...">
</transition>
 </div>
</div>
<div class="dropdown-menu">
<div class="dropdown-content">
  <transition-group name="auto">
    <a class="dropdown-item" v-for="dt in ftSrc"
      :key="dt.id" @click.stop="itemSelected(dt.name)">
      {{dt.name}}
   </a>
  </transition-group>
</div>
</div>
</div>
</template>
<script>
export default {
    name:'autoSuggest',
    props:{      
      value:{
        type:String,
        required:true
      }
  },
  data(){
    return {ftTxt:'',searching:false,dataAvailable:false}
  },
  computed:{
    src(){
      return this.$store.getters.countries;
    },
    ftSrc(){
       return this.src.filter(el=>{        
         if(this.ftTxt.trim()==''){
          return false;
         }
         else if(el.name.toString().toLowerCase().trim()
                .startsWith(this.ftTxt.toLowerCase().trim())){
           return true;
         }
         return false;
       });
    },
  },
  watch:{
    ftTxt(newVal,oldVal){           
        this.searching=true;
        setTimeout(()=>{
          this.searching=false;
        },300);      
    },
    ftSrc:{
      deep:true,
      handler(newVal,oldVal){
        if(newVal.length>0){
          this.dataAvailable=true;
        }
        else{
          this.dataAvailable=false;
        }
      }
    },
    value(newVal,oldVal){
      this.ftTxt=newVal;
    }
  },
  mounted(){
    this.ftTxt=this.value;
    this.$nextTick(()=>{
        this.dataAvailable=false;
      });
  },
  methods:{
    itemSelected(dt){
      this.ftTxt=dt; 
      this.$nextTick(()=>{
        this.dataAvailable=false;
      });
      this.$emit('input',dt);
    }
  }
}
</script>
<style scoped>
.auto-move{
  transition:all 0.3s;
}
.auto-enter-active,
.auto-leave-active{
  transition:all 0.3s;
}

.auto-enter,
.auto-leave-to{
  opacity:0;
  transform:translateX(1rem);
}

.search{
  width:13.5rem;  
}

.search-enter-active,
.search-leave-active{
  transition:all 0.3s;
}

.search-enter,
.search-leave-to{
  width:0;
}
</style>
