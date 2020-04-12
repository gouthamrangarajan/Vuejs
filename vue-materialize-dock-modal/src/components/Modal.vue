<template>
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
</template>
<script>
import {mapGetters,mapActions,mapState} from 'vuex'
export default {
    name:'Modal',
    data(){
        return{openedId:-1,modalDt:''}
    },
    mounted(){
        let elems = document.getElementById('modal1')
        let instances = M.Modal.init(elems,{dismissible:false})      
    },
    computed:{
         ...mapState(['curMode']),
         ...mapGetters(['editableInfo']),  
    },
    methods:{
        ...mapActions(['dockInfo','removeDock','removeEdit']),
         save(){
            this.$store.dispatch('saveInfo',{id:this.openedId,info:this.modalDt})
        },
        openModal(){
            let elem = document.getElementById('modal1')   
            let instance=M.Modal.getInstance(elem)
            instance.open()
            this.removeDock(this.openedId)
        },   
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
        },
    }
}
</script>
<style scoped>
.modal-close{
    cursor: pointer;
}
h4 i{
    font-size: 1rem;
}
.input-field{
    min-height: 20rem;
}
</style>