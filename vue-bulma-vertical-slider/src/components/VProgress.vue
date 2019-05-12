<template>
    <progress class="progress is-small is-info is-pulled-right" :value="value" max="100"></progress>
</template>
<script>
export default {
    name:'VProgress',
     mounted(){  
    setInterval(()=>{
        this.value++; 
        },50);
  },
  data(){
    return {value:1}
  } 
}
</script>
<style scoped>
.progress{
  transform:rotate(90deg);
  width:20rem;
  margin-right:-11rem;
  margin-top:-22rem;
}
@media only screen and (max-width: 425px){
  .progress{
    margin-top:-20.5rem;
  }
}
</style>
