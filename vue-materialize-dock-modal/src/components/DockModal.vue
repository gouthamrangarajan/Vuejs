<template>
    <div class="dock-modal">
        <transition-group name="slide">
            <a class="btn grey darken-3 yellow-text right" v-for="info in dockedInfo" :key="info.id">
                {{info.data|trim}}
                <span>
                    <i class="material-icons right waves-effect waves-red" @click="removeDock(info.id)">close</i>
                    <i class="material-icons right waves-effect waves-green" @click="edit(info.id)">launch</i>
                </span>
            </a>            
        </transition-group>       
        <transition name="fade">            
            <div :key="-1" class="right" v-if="remainingDockedInfo.length>0">                      
                <a class='dropdown-trigger btn grey darken-3 yellow-text' data-target='dropdown1'>
                    More
                    <i class="material-icons right">arrow_drop_up</i>
                </a>                    
                <ul id='dropdown1' class='dropdown-content'>
                    <li v-for="info in remainingDockedInfo" :key="info.id">
                        <a  @click="edit(info.id)">{{info.data|trim}}</a>
                    </li>                        
                </ul>
            </div>            
        </transition>
        <modal></modal>     
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import Modal from '@/components/Modal.vue'
export default {
    name:'DockModal',
    data(){
        return {dockItemsLen:4}
    },
    components:{
        Modal
    },
    computed:{        
        ...mapGetters(['dockableInfo']),       
        dockedInfo(){
            return this.dockableInfo.slice(0,this.dockItemsLen)
        },  
        remainingDockedInfo(){
            return this.dockableInfo.slice(this.dockItemsLen)
        }    
    },
    methods:{
        ...mapActions(['removeDock']),      
        edit(id){
            this.$store.dispatch('startEdit',id)
        },                                
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
        remainingDockedInfo(newVal,oldVal){            
            if(newVal.length>oldVal.length){                
                this.$nextTick(()=>{
                  let elems = document.querySelectorAll('.dropdown-trigger')
                  let instances = M.Dropdown.init(elems, {})
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
.dropdown-content{
    height: 13rem;
    width:9rem!important;
    overflow-y:auto;
    overflow-x: hidden;
}
</style>