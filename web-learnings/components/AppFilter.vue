<template>
  <div @click.stop="$refs.srch.focus()">
    <a class="btn-flat waves-effect waves-green tooltipped" data-position="left" data-tooltip="Filter"
      @click="togglePanelDisplay" id="filterBtn">
       <transition name="scale-in"  mode="out-in" appear>
         <i class="material-icons" v-if="srchTxt.length==0 && showFilter" :key="1">filter_list</i>
         <i class="material-icons red-text" v-else-if="showFilter" :key="2">filter_list</i>
       </transition>
      </a>
    <transition name="slide">
      <div class="card-panel grey darken-3" v-show="showPanel">
        <div class="input-field white-text">
           <i class="material-icons prefix">search</i>
            <input type="text" class="validate white-text" placeholder="Search..." v-model.trim="searchTxt" ref="srch"
              @keyup.enter="submit">
            <a class="btn-flat yellow-text right waves-effect waves-light"
              @click.stop="closePanel">
              Close
            </a>
            <a :class="{'btn-flat yellow-text right waves-effect waves-light':true,'disabled':searchTxt.length==0}"
              @click.stop="searchTxt='';submit()">
              Clear
            </a>           
             <a class="btn-flat green-text right waves-effect waves-light"  @click.stop="submit">
              Submit <i class="material-icons right">send</i>
            </a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {showPanel:false,showFilter:true,searchTxt:''}
  },
  mounted(){
    let elem=document.getElementById('filterBtn')
    let instances = M.Tooltip.init(elem, {})
    if(window){
      window.addEventListener('click',this.closePanel)
      window.addEventListener('scroll',this.closePanel)
    }
  },
  destroyed(){
    if(window){
      window.removeEventListener('click',this.closePanel)
      window.removeEventListener('scroll',this.closePanel)
    }
  },
  methods:{
    closePanel(){
      this.showPanel=false
    },
    togglePanelDisplay(){
      this.showPanel=!this.showPanel
      this.$nextTick(()=>{
        if(this.showPanel)
          this.$refs.srch.focus()
      })
    },
    submit(){       
        this.$store.dispatch('setSrchTxt',this.searchTxt)
    }
  },
  computed:{
    ...mapState(['srchTxt']),   
  },
  watch:{
    $route:{
      immediate:true,
      handler(newVal,oldVal){
        if(newVal.path=='/')
          this.showFilter=true
        else
          this.showFilter=false
      }
    }
  }
}
</script>
<style scoped>
.card-panel{
  position: absolute;
  width:25rem;
  right: 0;
  padding:0.6rem 0.4rem 0.4rem 0.4rem;
}
.card-panel i.prefix{
  margin-top:-0.5rem;
  cursor: pointer;
}
.slide-enter-active,
.slide-leave-active{
   transition: all 0.3s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform:translateY(-2rem);
}
.scale-in-enter-active
{
  animation:scale-in 0.5s;
}
.scale-in-leave-active
{
  animation:scale-in 0.5s reverse;
}
@keyframes scale-in {
  0%{
    transform:scale(0)
  }
  50%{
    transform: scale(1.5);
  }
  100%{
    transform: scale(1);
  }
}
</style>
