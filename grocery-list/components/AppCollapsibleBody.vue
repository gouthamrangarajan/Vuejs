<template>
  <div class="collapsible-body">
      <div class="row">
        <div class="col s3">
            <a class="btn-floating red darken-4 waves-effect waves-light" @click="lclItem.count--"
               :disabled="lclItem.count==0">
              <i class="material-icons">remove</i>
            </a>
        </div>
        <div class="col s3">
            <a class="btn-small deep-orange">{{lclItem.count}}</a>
        </div>
        <div class="col s3">
            <a class="btn-floating blue darken-4 waves-effect waves-light" @click="lclItem.count++"
               :disabled="lclItem.count==item.count">
               <i class="material-icons">add</i>
            </a>
        </div>
        <div class="col s3">
          <template v-if="lclItem.status=='To Buy'">
              <a class="btn-floating right waves-effect waves-light" @click="submit('Bought')">
                 <i class="material-icons">send</i>
              </a>
          </template>
          <template v-else>
              <a class="btn-floating right waves-effect waves-light"  @click="submit('To Buy')">
                <i class="material-icons">arrow_back</i>
              </a>
          </template>
        </div>
        <notification v-bind="notification" v-model="notification.display"/>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {lclItem:{name:'',count:0,id:-1,status:''},notification:{
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
    item:{
      type:Object,
      required:true
    },
  },
  methods:{
    submit(newStatus){
      if(this.lclItem.count==0){
        this.notification.msg='Please select a valid count'
        this.notification.duration=3000
        this.notification.success=false
        this.notification.display=true
      }
      else{
        if(this.lclItem.count==this.item.count){
          this.$store.dispatch('updateItemStatus',{data:{id:this.lclItem.id,status:newStatus},
            successFn:this.dataUpdated,failureFn:this.dataFailed})
        }
        else{
          this.$store.dispatch('updateItemCount',{data:{id:this.lclItem.id,count:this.item.count-this.lclItem.count},
            successFn:this.dataUpdated,failureFn:this.dataFailed})
          this.$store.dispatch('addItem',{data:{name:this.lclItem.name,status:newStatus,count:this.lclItem.count},
            successFn:this.dataUpdated,failureFn:this.dataFailed})
        }
      }
    },
    dataUpdated(){
      this.notification.duration=3000
      this.notification.msg='Successfully updated item...'
      this.notification.dismissible=false
      this.notification.success=true
      this.notification.display=true
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
    item:{
      immediate:true,
      handler(newVal,oldVal){
          this.lclItem.name=newVal.name
          this.lclItem.id=newVal.id
          this.lclItem.status=newVal.status
      }
    }
  }
}
</script>
<style scoped>
.btn-small{
  margin-top:0.2rem;
}
</style>
