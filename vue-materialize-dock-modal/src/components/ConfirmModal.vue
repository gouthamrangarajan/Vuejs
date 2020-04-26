<template>
     <div :id="id" class="modal confirm-modal">
            <div class="modal-content">
                <h4>Are you sure?</h4>                       
                 <p>Do you want to proceed? There are unsaved changes.</p>
            </div>
            <div class="modal-footer">                
                 <a class="modal-close waves-green btn-flat" @click="proceed">Yes</a>                                                    
                 <a class="modal-close waves-green btn-flat">No</a>
            </div>
        </div>     
</template>
<script>
export default {
    name:'ConfirmModal',
    props:{
        confirm:{
            type:Boolean,
            required:true
        },
        successAction:{
            type:Function,
            required:true
        },
        id:{
            type:String,
            required:true
        }
    },
    methods:{
        proceed(){
            this.successAction()
        }
    },
    mounted(){
        let elems = document.getElementById(this.id)
        let instances = M.Modal.init(elems,{dismissible:false})     
    },
    watch:{
        confirm(newVal){
            if(newVal){
                let elem = document.getElementById(this.id)   
                let instance=M.Modal.getInstance(elem)
                instance.open()
            }
        }
    }
}
</script>
<style scoped>
.confirm-modal{    
    margin-top:10rem;
}
</style>