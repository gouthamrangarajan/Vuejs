<template>
    <div>
        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>{{curMode}}
                    <i class="right modal-close material-icons" @click="dockInfo(openedId)">
                        indeterminate_check_box
                    </i>
                </h4>                                       
                <div class="row">
                    <div class="input-field col s12">
                        <ckeditor :editor="editor" v-model="modalHtml" :config="editorConfig"></ckeditor>
                        <div v-show="false" ref="rawDtEl" v-html="modalHtml">
                        </div>                        
                    </div>
                </div>                                
            </div>
            <div class="modal-footer">                
                <a class="modal-close waves-effect waves-light btn blue darken-4" @click="save">Save</a>    
                <a class="waves-effect waves-red btn-flat" @click="confirmRemoveEdit">Close</a>         
                <a class="waves-effect waves-orange btn-flat" @click="reset">Reset</a>                                  
            </div>
        </div>     
        <confirm-modal :confirm="triggerConfirmModal" :id="'confirmModal1'" :successAction="removeEdit"></confirm-modal>
    </div>
</template>
<script>
import {mapGetters,mapActions,mapState} from 'vuex'
import ConfirmModal from '@/components/ConfirmModal.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
    name:'Modal',
    components:{
        ConfirmModal
    },
    data(){
        return{openedId:-1,editorConfig:{},editor:ClassicEditor,triggerConfirmModal:false}
    },
    mounted(){
        let elems = document.getElementById('modal1')
        let instances = M.Modal.init(elems,{dismissible:false})      
    },
    computed:{
         ...mapState(['curMode']),
         ...mapGetters(['editableInfo']),  
         modalHtml:{
             get(){                 
                 if(this.editableInfo)                 
                    return this.editableInfo.dirtyHtml
                else
                  return ''
             },
             set(val){
                 if(this.editableInfo)
                    this.$store.dispatch('setDirtyInfo',{id:this.openedId,dirtyHtml:val})
             }
         }
    },
    methods:{
        ...mapActions(['dockInfo','removeDock']),
         reset(){
            var html=this.editableInfo.html
            this.$store.dispatch('setDirtyInfo',{id:this.openedId,dirtyHtml:html})
         },
         removeEdit(){
            this.reset()
            this.$store.dispatch('removeEdit',this.openedId)
            let elem = document.getElementById('modal1')   
            let instance=M.Modal.getInstance(elem)
            instance.close()
         },
         confirmRemoveEdit(){
             if(this.editableInfo.dirtyHtml!=this.editableInfo.html){
                this.triggerConfirmModal=true
                this.$nextTick(()=>{this.triggerConfirmModal=false}) 
             }
             else
                 this.removeEdit()
             
         },
         save(){
            let dt=this.$refs.rawDtEl.innerText               
            this.$store.dispatch('saveInfo',{id:this.openedId,raw:dt,html:this.modalHtml,dirtyHtml:this.modalHtml})
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
                this.openModal()                
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