<template>
    <div class="dock-modal">
        <transition-group name="slide">
            <a class="waves-effect waves-red btn grey darken-3 yellow-text right" v-for="info in visibleInfo" :key="info.id">
                {{info.data|trim}}
                <span>
                    <i class="material-icons right" @click="removeDock(info.id)">close</i>
                    <i class="material-icons right" @click="edit(info.id)">launch</i>
                </span>
            </a>
        </transition-group>
        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
            <h4>{{curMode}}
                 <i class="right modal-close waves-effect waves-red material-icons" @click="dockInfo(openedId)">
                        indeterminate_check_box
                 </i>
                </h4>                       
             <div class="row">                
                <div class="row">
                    <div class="input-field col s12 z-depth-1  grey lighten-4">
                        <textarea class="materialize-textarea" v-model="modalDt" id="textarea">
                        </textarea>                        
                    </div>
                </div>                
            </div>
            </div>
            <div class="modal-footer">
                 <a class="modal-close waves-effect waves-light btn blue darken-4" @click="save">Save</a>    
                 <a class="modal-close waves-effect waves-red btn-flat" @click="removeEdit(openedId)">Close</a>                 
            </div>
        </div>         
    </div>
</template>
<script>
import {mapGetters,mapActions,mapState} from 'vuex'
export default {
    name:'DockModal',
    data(){
        return {openedId:-1,dockItemsLen:5,modalDt:''}
    },
    computed:{        
        ...mapGetters(['editableInfo','dockableInfo']),
        ...mapState(['curMode']),
        visibleInfo(){
            return this.dockableInfo.slice(0,this.dockItemsLen)
        },      
    },
    methods:{
        ...mapActions(['removeEdit','dockInfo','removeDock']),
        save(){
            this.$store.dispatch('saveInfo',{id:this.openedId,info:this.modalDt})
        },
        edit(id){
            this.$store.dispatch('startEdit',id)
        },                     
        openModal(){
            let elem = document.getElementById('modal1')   
            let instance=M.Modal.getInstance(elem)
            instance.open()
            this.removeDock(this.openedId)
        },        
    },
    mounted(){
        let elems = document.getElementById('modal1')
        let instances = M.Modal.init(elems,{dismissible:false})      
    },
    filters:{
        trim(val){
            if(val.trim().length==0){
                return "New Information"
            }
            else{
                return val.substring(0,15)
            }
        }
    },        
    watch:{
        editableInfo(newVal,oldVal){
            if(newVal){
                this.openedId=newVal.id                
                this.modalDt=newVal.data
                this.openModal()
                this.$nextTick(()=>{
                    let elem = document.getElementById('textarea')   
                    M.textareaAutoResize(elem)
                })
            }
        }
    }
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
.modal-close{
    cursor: pointer;
}
.btn i{
    font-size: 0.8rem;
}
h4 i{
    font-size: 1rem;
}
.slide-move{
    transition:all 0.3s;
}
.slide-enter-active{
    transition:all 0.3s;
}
.slide-enter{
    transform: translateY(-30rem);
}
.input-field{
    min-height: 20rem;
}
</style>