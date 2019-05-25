<template>
    <li>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" v-model="value">
    </div>
    <div class="control">      
      <a class="button is-outlined is-dark" @click="value=''">
        <i class="fas fa-backspace"></i>
      </a> 
    </div>
    <div class="control">
      <a class="button is-outlined is-success" @click="change">
        <i class="fas fa-check"></i>
      </a> 
    </div>  
  <div class="control">
     <a class="button is-outlined is-danger" @click="cancel">
          <i class="fas fa-times"></i>
        </a>
  </div>
  </div>      
    </li>
</template>
<script>
export default {
    name:'listItemEdit',
    props:{
    data:{
      type:String,
      required:true
    }
  },
 data()
 {
   return {value:''}
 },
  methods:{
    cancel(){
       this.value=this.data;
       this.$emit('cancel');
    },
    change(){
      if(this.value.trim().length>0){
       this.$emit('change',this.value);
      }
    }
  },
  watch:{
    data(newVal,oldVal){
       this.value=newVal;
    }
  },
  mounted(){
    this.value=this.data;
  }
}
</script>

