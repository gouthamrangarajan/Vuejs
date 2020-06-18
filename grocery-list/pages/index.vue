<template>
  <div class="page">
     <div class="row">
          <div class="col s12 l6">
                <AppCollection :header="'To Buy'" :items="toBuyItems" :id="1">
                </AppCollection>
          </div>
          <div class="col s12 l6">
              <AppCollection :header="'Bought'" :items="boughtItems" :id="3">
              </AppCollection>
          </div>
     </div>
     <div class="fixed-action-btn" @click.stop>
        <a class="btn-floating btn-large blue waves-effect waves-light">
          <i class="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li>
            <a class="btn-floating red tooltipped" @click.stop="confirmRemove=true" :disabled="disableRemove"
               data-position="left" data-tooltip="Clear All">
              <i class="material-icons">delete</i>
            </a>
          </li>
          <li><a class="btn-floating green" @click.stop="showAddItem=true"><i class="material-icons">add</i></a></li>
      </ul>
    </div>
    <AddItem v-model="showAddItem"></AddItem>
    <AppModal v-model="confirmRemove" :successFn="clearData"></AppModal>
    <notification v-bind="notification" v-model="notification.display"/>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {
    AppCollection:()=>import('@/components/AppCollection'),
    AddItem:()=>import('@/components/AddItem'),
    AppModal:()=>import('@/components/AppModal'),
    Notification:()=>import('@/components/Notification.vue'),
  },
  data(){
    return {
      showAddItem:false,
      confirmRemove:false,
      notification:{
          msg:'',
          display:false,
          processing:true
      }
    }
  },
  methods:{
   ...mapActions(['clearData'])
  },
  mounted(){
    if(process.client){
        let elems = document.querySelectorAll('.fixed-action-btn')
        let instances = M.FloatingActionButton.init(elems, {})
        let elems1 = document.querySelectorAll('.tooltipped')
        let instances1 = M.Tooltip.init(elems1, {})
        setTimeout(()=>{
          this.notification.msg='* Data is stored in browser<br/>'
          this.notification.msg+='Clearing browser data/local storage will remove the data'
          this.notification.display=true
        },1000)
    }
  },
  computed:{
    ...mapGetters(['toBuyItems','boughtItems']),
    disableRemove(){
      if(this.toBuyItems.length==0 && this.boughtItems.length==0)
        return true
      else
        return false
    }
  }
}
</script>

<style>
.row{
  padding:0.8rem;
}
.material-tooltip{
  background-color: #ffffff;
  color:#000000;
}
</style>
