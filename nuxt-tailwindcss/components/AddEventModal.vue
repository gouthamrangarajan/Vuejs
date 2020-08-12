<template>
    <transition name="modal-slide" appear>
        <div class="w-1/4 shadow-2xl z-10 bg-white px-6 py-4 absolute rounded top-0 left-0 flex flex-col" :style="modalOffset"
            v-show="value" @click.stop>
            <div class="flex justify-between">
                <span class="text-2xl text-orange-600">
                    Add Event
                </span>
                <a class="text-lg text-red-700 cursor-pointer" @click.stop="close">
                    &times;
                </a>
            </div>            
            <div class="input-field mt-4 flex flex-col">
                <label>Name</label>
                <input class="py-1 px-3 border border-teal-700 outline-none rounded" v-model.trim="name" ref="input" @keyup.enter="save"
                 @keyup.esc="close">
            </div>
            <div class="flex justify-end mt-4">
                <a class="btn bg-teal-700 text-white py-1 px-3 hover:bg-teal-600 cursor-pointer rounded" @click.stop="save">Save</a>
            </div>
            
        </div>
    </transition>
</template>
<script>
export default {
    props:{
        offset:{
            type:Object,
            required:false,
            default:function(){
                return{left:25,  top:25}
            },           
        },        
        value:{
            type:Boolean,
            required:true
        },
        date:{
            type:Date,
            required:false,
            default:function(){
                return new Date()
            }
        }
    },
    data(){
        return {name:''}
    },
    computed:{
        modalOffset(){
            let dt={}
            dt.marginLeft=this.offset.left+'px'
            dt.marginTop=this.offset.top+'px'
            return dt
        }
    },
    watch:{
        value(newVal){            
            if(newVal)
                setTimeout(()=>{this.$refs.input.focus()},300)                            
        }
    },
    methods:{
        save(){
            if(this.name=='')
                return

            this.$emit('addEvent',{name:this.name,date:this.date})
            this.name=''
            this.close()    
        },
        close(){
            this.$emit('input',false)
        }
    }
}
</script>
<style scoped>
.modal-slide-enter-active,
.modal-slide-leave-active{
    transition:all 0.3s;
}
.modal-slide-enter,
.modal-slide-leave-to{
    opacity: 0;
    transform: translateX(-2rem);
}
.btn{
    transition:all 0.3s;
}
</style>