<template>
      <li :class="{'strike-through has-text-primary':value
          ,'has-text-danger':!value}">
       <slot name="data">{{data}}&nbsp;</slot>
         <transition name="fade" mode="out-in">
            <template v-if="!value">
              &nbsp;
              <a class="is-link is-outlined is-small button is-edit"
                 @click="$emit('edit-clicked')">
                <i class="fa fa-pencil-alt"></i>                
              </a>
            </template>
            </transition>
            <label class="checkbox is-pulled-right">
              <input type="checkbox"
                @change="$emit('input',checked)" 
               v-model="checked">
               Completed
          </label>
    </li>
</template>
<script>
export default {
    name:'listItem',
    props:{
    value:{
      type:Boolean,
      required:true
    },
    data:{
      type:String,
      required:false
    }
  },
  data(){
    return {checked:false}
  },
  watch:{
    value(newVal,oldVal){
      if(newVal){
        this.checked=true;
      }
      else{
        this.checked=false;
      }
    }
  },   
}
</script>
