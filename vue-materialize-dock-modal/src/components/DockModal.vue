<template>
    <div>
        <modal></modal>    
        <confirm-modal :confirm="triggerConfirmModal" :id="'confirmModal2'" :successAction="removeDock"></confirm-modal>
        <div class="dock-modal">
            <transition-group name="slide">
                <a class="btn grey darken-3 yellow-text right" v-for="info in dockedInfo" :key="info.id">
                    {{info.raw|trim}}
                    <span>
                        <i class="material-icons right waves-effect waves-red" @click="confirmRemoveDock(info.id)">close</i>
                        <i class="material-icons right waves-effect waves-green" @click="edit(info.id)">launch</i>
                    </span>
                </a>            
            </transition-group>                       
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import ConfirmModal from '@/components/ConfirmModal.vue'
import Modal from '@/components/Modal.vue'
export default {
    name:'DockModal',
    data(){
        return {dockItemsLen:4,triggerConfirmModal:false,confirmId:-1}
    },
    components:{
        Modal,
        ConfirmModal
    },
    computed:{        
        ...mapGetters(['dockableInfo']),       
        dockedInfo(){
            return this.dockableInfo.slice(0,this.dockItemsLen)
        } 
    },
    methods:{
        confirmRemoveDock(id){            
            this.confirmId=id
            var item=this.dockableInfo.filter(el=>el.id==id)[0]            
            if(item.html!=item.dirtyHtml){               
               this.triggerConfirmModal=true
               this.$nextTick(()=>{this.triggerConfirmModal=false}) 
            }
            else
                this.removeDock()
        },
        removeDock(){
          var item=this.dockableInfo.filter(el=>el.id==this.confirmId)[0]
          this.$store.dispatch('setDirtyInfo',{id:item.id,dirtyHtml:item.html})
          this.$store.dispatch('removeDock',this.confirmId)
        },        
        edit(id){
            this.$store.dispatch('startEdit',id)
        },                                
    },    
    filters:{
        trim(val){            
            if(!val || val.trim().length==0){
                return "New Information"
            }
            else{
                return val.substring(0,15)
            }
        }
    },            
}
</script>
<style scoped>
.dock-modal{
    bottom: 0;
    width: 100%;                
    position:fixed; 
    padding-right: 5rem;   
}
.btn{
   margin-right: 1rem; 
   margin-bottom: 0.5rem;
}
.btn i{
    font-size: 0.8rem;
}

.slide-move{
    transition:all 0.3s;
}
.slide-enter-active{
    transition:all 0.3s;
}
.slide-leave-active{
    animation:fade-out 0.3s;
}
.slide-enter{
    transform: translateY(-30rem);
}
.slide-leave-to{
    opacity:0;
}

@keyframes fade-out {
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
</style>