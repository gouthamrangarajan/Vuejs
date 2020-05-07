<template>
 <div class="row">  
   <transition name="fade">
   <div class="col s12 drop-down l6" v-show="info.display">
      <a :class="'btn '+theme+' dropdown-trigger-'+id" :data-target="'dropdown_'+id">
        Show {{info.length}} entries
        <i class="material-icons right">arrow_drop_down</i>
      </a>
      <ul :id="'dropdown_'+id" class="dropdown-content">
        <li v-for="pgLen in info.pgLenList" :key="pgLen" :class="{'active':pgLen==info.length}">
            <a @click="$emit('changeLen',pgLen)">{{pgLen}}</a>
        </li>
      </ul>
   </div>
   </transition>
   <transition name="fade">
   <div class="col s12 l6" v-show="info.display">
      <div class="card-panel mt-reduce-half">
        <span class="deep-orange-text">
           {{info.fromTo}} of {{info.total}}
        </span>
        <span class="right">
          <span class="waves-effect waves-orange btn-small white black-text" :disabled="info.isFirstPage" @click="$emit('decrease')">
            <i class="material-icons">arrow_backward</i>
            </span>
            &nbsp;
          <span class="waves-effect waves-orange btn-small white black-text" :disabled="info.isLastPage" @click="$emit('increase')">
            <i class="material-icons">arrow_forward</i>
            </span>
        </span>
      </div>
   </div>
   </transition>
 </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props:{
    info:{
      type:Object,
      required:true
    },
    id:{
      type:String,
      required:true
    }
  },
  mounted(){
    var elems = document.querySelectorAll('.dropdown-trigger-'+this.id)
    var instances = M.Dropdown.init(elems, {coverTrigger:false});
  },
  computed:{
      ...mapState(['theme'])
  }
}
</script>
<style scoped>

.btn-small{
  max-width: 3.5rem;
}
.drop-down{
  margin-top:1.5rem;
}
@media  screen  and (max-width:992px) {
  .drop-down{
    margin-top:0;
    margin-bottom:1rem;
  }
  .dropdown-content{
    z-index: 2;
  }
}
</style>
