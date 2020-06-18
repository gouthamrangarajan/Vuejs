<template>
 <transition name="slide" mode="out-in">
  <div class="card blue-grey darken-2 small" v-show="value" :key="1" @click.stop="$refs.name.focus()">
    <div class="card-content">
      <span class="yellow-text card-title">Enter Info
        <i class="material-icons right red-text" @click="closePanel">close</i>
      </span>
      <div class="input-field">
         <i class="material-icons prefix white-text">local_grocery_store</i>
         <input type="text" class="white-text validate" placeholder="Item..." ref="name"
            v-model.trim="name" name="name" @keyup.enter="add"/>
      </div>
      <div class="input-field">
          <i class="material-icons prefix white-text">add_shopping_cart</i>
          <input id="Quantity" type="number" class="white-text validate" v-model.number="count"
            @click.stop name="count"  @keyup.enter="add"/>
          <label for="Quantity" class="active white-text">Quantity</label>
      </div>
      <notification v-bind="notification" v-model="notification.display"/>
    </div>
    <div class="card-action">
       <a class="yellow-text waves-effect waves-light" @click="add">Add</a>
    </div>
  </div>
 </transition>
</template>
<script>
export default {
  data(){
    return{name:'',count:1,notification:{
          msg:'',
          display:false,
          success:true,
          duration:4000,
          dismissible:false
      }}
  },
  components:{
    Notification:()=>import('@/components/Notification.vue'),
  },
  props:{
    value:{
      type:Boolean,
      required:true
    }
  },
  created(){
    if(process.client){
      window.addEventListener('click',this.closePanel)
    }
  },
  destroyed(){
    if(process.client){
      window.removeEventListener('click',this.closePanel)
    }
  },
  methods:{
    closePanel(){
      this.$emit('input',false)
    },
    add(){
      let errorMsgs=[]
       if(this.name=='')
          errorMsgs.push('Item cannot be empty')
       if(this.count<1 || this.count>20)
          errorMsgs.push('Quantity should be between 1 and 20')

       if(errorMsgs.length>0){
          this.notification.msg='* Please check the following<br/>'
          errorMsgs.forEach((el,index)=>{
            this.notification.msg+= (index+1)+'.'+el+'<br/>'
          })
         this.notification.duration=5000
         this.notification.success=false
         this.notification.dismissible=false
         this.notification.display=true
       }
       else{
          this.$store.dispatch('addItem',{data:{name:this.name,count:this.count,status:'To Buy'},
              successFn:this.dataAdded,FailureFn:this.dataFailed})
       }
    },
    dataAdded(){
      this.name=''
      this.count=1
      this.notification.duration=3000
      this.notification.msg='Successfully added item...'
      this.notification.dismissible=false
      this.notification.success=true
      this.notification.display=true
      this.$refs.name.focus()
    },
    dataFailed(){
      this.notification.duration=3000
      this.notification.msg='Error adding details.Please try again later...'
      this.notification.dismissible=false
      this.notification.success=false
      this.notification.display=true
    },
  },
  watch:{
    value(newVal,oldVal){
      if(newVal){
        setTimeout(()=>{
          this.$refs.name.focus()
        },300)
      }
    }
  }
}
</script>
<style scoped>
i,a{
  cursor: pointer;
}
.card{
  position:fixed;
  bottom:-1rem;
  right: 0;
  width:25rem;
  z-index:997;
}
.slide-enter-active,
.slide-leave-active{
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform:translateY(300px);
}
</style>
